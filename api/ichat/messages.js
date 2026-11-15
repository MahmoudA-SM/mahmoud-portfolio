import crypto from 'node:crypto'
import { del } from '@vercel/blob'
import { redis, who, notify, K } from './_common.js'

const MAX_FILE = 20 * 1024 * 1024

function cleanFile(f) {
  if (!f || typeof f !== 'object') return null
  let u
  try { u = new URL(String(f.url)) } catch { return null }
  if (u.protocol !== 'https:' || !u.hostname.endsWith('.public.blob.vercel-storage.com')) return null
  const size = Number(f.size) || 0
  if (size > MAX_FILE) return null
  return {
    url: u.toString(),
    name: Array.from(String(f.name || 'document.pdf')).filter((c) => c.charCodeAt(0) > 31).join('').slice(0, 200),
    size,
    type: 'application/pdf',
  }
}

const parse = (r) => (typeof r === 'string' ? JSON.parse(r) : r)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  const role = who(req)
  if (!role) return res.status(401).json({ error: 'unauthorized' })

  try {
    if (req.method === 'GET') {
      const since = Number(req.query.since) || 0
      const ids = await redis.zrange(K.msgs, since ? '(' + since : '-inf', '+inf', { byScore: true })
      let msgs = []
      if (ids.length) {
        const rows = await redis.mget(...ids.map(K.msg))
        msgs = rows.filter(Boolean).map(parse)
      }
      return res.json({ messages: msgs, now: Date.now() })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
      const text = String(body.text || '').slice(0, 8000).trim()
      let image = null
      if (body.image) {
        const m = /^data:image\/(jpeg|png|webp|gif);base64,([A-Za-z0-9+/=]+)$/.exec(String(body.image))
        if (!m || body.image.length > 3_500_000) return res.status(400).json({ error: 'bad image' })
        image = crypto.randomBytes(8).toString('hex')
        await redis.set(K.img(image), body.image)
      }
      let file = null
      if (body.file) {
        file = cleanFile(body.file)
        if (!file) return res.status(400).json({ error: 'bad file' })
      }
      if (!text && !image && !file) return res.status(400).json({ error: 'empty' })
      let ts = Date.now()
      const last = await redis.zrange(K.msgs, 0, 0, { rev: true, withScores: true })
      if (last.length === 2 && ts <= Number(last[1])) ts = Number(last[1]) + 1
      const id = ts.toString(36) + crypto.randomBytes(3).toString('hex')
      const msg = { id, from: role, text, ts }
      if (image) msg.image = image
      if (file) msg.file = file
      await redis.set(K.msg(id), JSON.stringify(msg))
      await redis.zadd(K.msgs, { score: ts, member: id })
      if (role !== 'assistant') await notify(msg)
      return res.json({ ok: true, message: msg })
    }

    if (req.method === 'DELETE') {
      const id = String(req.query.id || '')
      if (!id) return res.status(400).json({ error: 'id required' })
      const row = await redis.get(K.msg(id))
      const msg = row ? parse(row) : null
      // assistant may delete anything; Mo only his own messages
      if (role !== 'assistant' && (!msg || msg.from !== role)) return res.status(403).json({ error: 'forbidden' })
      if (msg && msg.image) await redis.del(K.img(msg.image))
      if (msg && msg.file) { try { await del(msg.file.url) } catch { /* ignore */ } }
      await redis.zrem(K.msgs, id)
      await redis.del(K.msg(id))
      return res.json({ ok: true })
    }
    res.status(405).json({ error: 'method' })
  } catch {
    res.status(500).json({ error: 'server' })
  }
}
