import { Redis } from '@upstash/redis'
import crypto from 'node:crypto'

export const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export const K = { msgs: 'ichat:msgs', msg: (id) => 'ichat:msg:' + id, img: (id) => 'ichat:img:' + id }

export function eq(a, b) {
  if (!a || !b) return false
  const x = Buffer.from(String(a)), y = Buffer.from(String(b))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}

// returns 'mo' | 'assistant' | null. Token: Authorization: Bearer <t> or X-Token header.
export function who(req) {
  const auth = req.headers['authorization'] || ''
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  const t = bearer || req.headers['x-token'] || ''
  if (eq(t, process.env.ICHAT_MO_TOKEN)) return 'mo'
  if (eq(t, process.env.ICHAT_ASSISTANT_TOKEN)) return 'assistant'
  return null
}

// Fires on Mo's posts. Skipped silently when ICHAT_WEBHOOK_URL is not set.
export async function notify(msg) {
  const url = process.env.ICHAT_WEBHOOK_URL
  if (!url) return
  const key = process.env.ICHAT_WEBHOOK_KEY
  const headers = { 'Content-Type': 'application/json' }
  if (key) {
    const spec = process.env.ICHAT_WEBHOOK_HEADER || 'Authorization'
    if (spec.includes(':')) {
      const i = spec.indexOf(':')
      headers[spec.slice(0, i).trim()] = spec.slice(i + 1).replace(/<key>|\{key\}/g, key).trim()
    } else {
      headers[spec.trim()] = spec.trim().toLowerCase() === 'authorization' ? 'Bearer ' + key : key
    }
  }
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 5000)
  try {
    const body = { id: msg.id, from: msg.from, text: msg.text || (msg.file ? '[PDF attached]' : msg.image ? '[image attached]' : ''), ts: msg.ts }
    if (msg.file) body.file = { url: msg.file.url, name: msg.file.name }
    await fetch(url, { method: 'POST', headers, signal: ctl.signal, body: JSON.stringify(body) })
  } catch { /* never fail the post because of the webhook */ }
  finally { clearTimeout(timer) }
}
