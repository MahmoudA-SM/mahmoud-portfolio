import { who } from './_common.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  const role = who(req)
  if (!role) return res.status(401).json({ error: 'unauthorized' })
  res.json({ role })
}
