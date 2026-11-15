import { redis, who, K } from './_common.js'

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  if (!who(req)) return res.status(401).end()
  const id = String(req.query.id || '').replace(/[^a-f0-9]/g, '')
  const d = id && (await redis.get(K.img(id)))
  const m = d && /^data:(image\/[a-z]+);base64,(.+)$/.exec(String(d))
  if (!m) return res.status(404).end()
  res.setHeader('Content-Type', m[1])
  res.setHeader('Cache-Control', 'private, max-age=86400')
  res.send(Buffer.from(m[2], 'base64'))
}
