import './style.css'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { upload } from '@vercel/blob/client'

const API = '/api/ichat'
const $ = (id) => document.getElementById(id)
const list = $('list'), textEl = $('text'), sendBtn = $('send'), fileEl = $('file'), prev = $('attach-preview')

// ---- token: from #t=<token> or /informatica/c/<token>; kept in localStorage, then removed from the address bar
function readToken() {
  let t = ''
  const h = location.hash.replace(/^#/, '')
  const m = /(?:^|&)t=([^&]+)/.exec(h) || (h && !h.includes('=') ? [0, h] : null)
  if (m) t = decodeURIComponent(m[1])
  const p = /\/informatica\/c\/([^/]+)/.exec(location.pathname)
  if (!t && p) t = decodeURIComponent(p[1])
  if (t) {
    try { localStorage.setItem('ichat-token', t) } catch { /* ignore */ }
    history.replaceState(null, '', '/informatica/')
    return t
  }
  try { return localStorage.getItem('ichat-token') || '' } catch { return '' }
}
const TOKEN = readToken()
const auth = () => ({ Authorization: 'Bearer ' + TOKEN })

// ---- theme
const themeBtn = $('theme')
const sun = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
const moon = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>'
const isDark = () => (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark'
const paintTheme = () => { themeBtn.innerHTML = isDark() ? sun : moon }
themeBtn.onclick = () => {
  const next = isDark() ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  try { localStorage.setItem('ichat-theme', next) } catch { /* ignore */ }
  paintTheme()
}
paintTheme()

// ---- markdown (assistant replies only), sanitized; links open in a new tab
DOMPurify.addHook('afterSanitizeAttributes', (n) => {
  if (n.tagName === 'A') { n.setAttribute('target', '_blank'); n.setAttribute('rel', 'noopener noreferrer nofollow') }
})
marked.setOptions({ gfm: true, breaks: true })
function md(text) {
  const html = DOMPurify.sanitize(marked.parse(text || ''), { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form', 'input', 'button'], FORBID_ATTR: ['style'] })
  const box = document.createElement('div')
  box.className = 'md'
  box.innerHTML = html
  box.querySelectorAll('pre').forEach((pre) => {
    const b = document.createElement('button')
    b.className = 'copy'; b.type = 'button'; b.textContent = 'Copy'
    b.onclick = async () => {
      try { await navigator.clipboard.writeText(pre.querySelector('code')?.innerText ?? pre.innerText); b.textContent = 'Copied' } catch { b.textContent = 'Failed' }
      setTimeout(() => (b.textContent = 'Copy'), 1400)
    }
    pre.appendChild(b)
  })
  return box
}

// ---- state
let msgs = []          // confirmed messages
let pendingLocal = []  // optimistic messages not yet confirmed
let lastTs = 0
let pending = null     // attachment waiting to be sent
let busy = false
const imgCache = new Map()

const setStatus = (kind, label) => {
  const s = $('status')
  s.querySelector('i').className = 'dot ' + kind
  s.querySelector('span').textContent = label
}
function toast(t) {
  const e = document.createElement('div'); e.className = 'toast'; e.textContent = t
  document.body.appendChild(e); setTimeout(() => e.remove(), 2600)
}
const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
const fmtDay = (ts) => {
  const d = new Date(ts), n = new Date()
  const y = new Date(n); y.setDate(n.getDate() - 1)
  if (d.toDateString() === n.toDateString()) return 'Today'
  if (d.toDateString() === y.toDateString()) return 'Yesterday'
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

async function loadImage(img, id) {
  try {
    if (!imgCache.has(id)) {
      const r = await fetch(`${API}/img?id=${id}`, { headers: auth() })
      if (!r.ok) throw new Error('x')
      imgCache.set(id, URL.createObjectURL(await r.blob()))
    }
    img.src = imgCache.get(id)
    img.onclick = () => {
      const lb = document.createElement('div'); lb.className = 'lightbox'
      const big = document.createElement('img'); big.src = img.src; lb.appendChild(big)
      lb.onclick = () => lb.remove(); document.body.appendChild(lb)
    }
  } catch { img.alt = 'Image unavailable' }
}

function el(m) {
  const wrap = document.createElement('div')
  wrap.className = `msg ${m.from}${m.local ? ' sending' : ''}`
  wrap.dataset.id = m.id
  if (m.from === 'assistant') {
    const w = document.createElement('div'); w.className = 'who'; w.textContent = 'Assistant'; wrap.appendChild(w)
  }
  const bub = document.createElement('div'); bub.className = 'bubble'
  if (m.image) {
    const img = document.createElement('img'); img.className = 'img'; img.alt = 'Attached image'
    if (m.localImage) { img.src = m.localImage } else loadImage(img, m.image)
    bub.appendChild(img)
  }
  if (m.file) {
    const a = document.createElement('a'); a.className = 'pdf'; a.href = m.file.url; a.target = '_blank'; a.rel = 'noopener noreferrer'
    a.innerHTML = '<b>PDF</b>'; const s = document.createElement('span'); s.textContent = m.file.name; a.appendChild(s)
    bub.appendChild(a)
  }
  if (m.text) {
    if (m.from === 'assistant') bub.appendChild(md(m.text))
    else { const p = document.createElement('div'); p.textContent = m.text; bub.appendChild(p) }
  }
  wrap.appendChild(bub)
  const meta = document.createElement('div'); meta.className = 'meta'
  meta.appendChild(document.createTextNode(m.local ? 'Sending…' : fmtTime(m.ts)))
  if (!m.local && (m.from === 'mo')) {
    const del = document.createElement('button'); del.type = 'button'; del.textContent = 'Delete'
    del.onclick = async () => {
      if (!confirm('Delete this message?')) return
      const r = await fetch(`${API}/messages?id=${encodeURIComponent(m.id)}`, { method: 'DELETE', headers: auth() })
      if (r.ok) { msgs = msgs.filter((x) => x.id !== m.id); render(false) } else toast('Could not delete')
    }
    meta.appendChild(del)
  }
  wrap.appendChild(meta)
  return wrap
}

function render(stick = true) {
  const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 140
  const all = [...msgs, ...pendingLocal]
  list.replaceChildren()
  if (!all.length) {
    const e = document.createElement('div'); e.className = 'empty'
    e.innerHTML = '<h2>Informatica Notes</h2><p>Ask how to do something in Informatica on-prem (Axon, EDC, IDQ), or post a project update. Replies will appear here.</p>'
    list.appendChild(e); return
  }
  let day = ''
  for (const m of all) {
    const d = new Date(m.ts).toDateString()
    if (d !== day) { day = d; const s = document.createElement('div'); s.className = 'day'; s.textContent = fmtDay(m.ts); list.appendChild(s) }
    list.appendChild(el(m))
  }
  if (all[all.length - 1].from === 'mo') {
    const t = document.createElement('div'); t.className = 'typing'
    t.innerHTML = '<i></i><i></i><i></i><span>Waiting for a reply…</span>'
    list.appendChild(t)
  }
  if (stick || nearBottom) requestAnimationFrame(() => { list.scrollTop = list.scrollHeight })
}

// ---- polling
async function poll(first = false) {
  if (!TOKEN) return
  try {
    const r = await fetch(`${API}/messages?since=${lastTs}`, { headers: auth(), cache: 'no-store' })
    if (r.status === 401) { $('gate').hidden = false; $('composer').hidden = true; setStatus('off', 'Not authorised'); return 'stop' }
    if (!r.ok) throw new Error('bad')
    const { messages } = await r.json()
    setStatus('on', 'Connected')
    if (messages.length) {
      const known = new Set(msgs.map((m) => m.id))
      const fresh = messages.filter((m) => !known.has(m.id))
      msgs = msgs.concat(fresh)
      lastTs = Math.max(lastTs, ...messages.map((m) => m.ts))
      if (fresh.length || first) render(first || fresh.some((m) => m.from === 'assistant'))
    } else if (first) render(true)
  } catch { setStatus('off', 'Offline, retrying…') }
}
async function loop() {
  for (;;) {
    if ((await poll()) === 'stop') return
    await new Promise((r) => setTimeout(r, document.hidden ? 12000 : 2500))
  }
}

// ---- composer
function autosize() { textEl.style.height = 'auto'; textEl.style.height = Math.min(textEl.scrollHeight, 180) + 'px' }
const refreshSend = () => { sendBtn.disabled = busy || (!textEl.value.trim() && !pending) }
textEl.addEventListener('input', () => { autosize(); refreshSend() })
textEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && !matchMedia('(hover: none)').matches) { e.preventDefault(); send() }
})
$('attach').onclick = () => fileEl.click()

function shrinkImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file), im = new Image()
    im.onload = () => {
      const max = 1600, s = Math.min(1, max / Math.max(im.width, im.height))
      const c = document.createElement('canvas'); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s)
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      let q = 0.86, out = c.toDataURL('image/jpeg', q)
      while (out.length > 3_300_000 && q > 0.4) { q -= 0.12; out = c.toDataURL('image/jpeg', q) }
      out.length > 3_300_000 ? reject(new Error('big')) : resolve(out)
    }
    im.onerror = () => reject(new Error('img'))
    im.src = url
  })
}

function paintPreview() {
  prev.replaceChildren()
  if (!pending) { prev.hidden = true; return }
  prev.hidden = false
  if (pending.image) { const i = document.createElement('img'); i.src = pending.image; i.alt = ''; prev.appendChild(i) }
  const n = document.createElement('span'); n.textContent = pending.name; prev.appendChild(n)
  if (pending.uploading) { const p = document.createElement('span'); p.className = 'prog'; p.textContent = 'Uploading…'; prev.appendChild(p) }
  const x = document.createElement('button'); x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', 'Remove attachment')
  x.onclick = () => { pending = null; paintPreview(); refreshSend() }
  prev.appendChild(x)
}

fileEl.onchange = async () => {
  const f = fileEl.files[0]; fileEl.value = ''
  if (!f) return
  try {
    if (f.type === 'application/pdf') {
      if (f.size > 20 * 1024 * 1024) return toast('PDF is over 20 MB')
      pending = { name: f.name, uploading: true }; paintPreview(); refreshSend()
      const b = await upload(`ichat/${f.name.replace(/[^\w.\- ]/g, '_')}`, f, { access: 'public', handleUploadUrl: `${API}/upload`, clientPayload: TOKEN })
      pending = { name: f.name, file: { url: b.url, name: f.name, size: f.size } }
    } else if (/^image\//.test(f.type)) {
      pending = { name: f.name, image: await shrinkImage(f) }
    } else return toast('Attach an image or a PDF')
  } catch { pending = null; toast('Could not attach that file') }
  paintPreview(); refreshSend()
}

async function send() {
  const text = textEl.value.trim()
  if (busy || (!text && !pending) || (pending && pending.uploading)) return
  busy = true; refreshSend()
  const att = pending
  const local = { id: 'local-' + Date.now(), from: 'mo', text, ts: Date.now(), local: true, image: att?.image ? 'x' : undefined, localImage: att?.image, file: att?.file }
  pendingLocal.push(local); render(true)
  textEl.value = ''; autosize(); pending = null; paintPreview()
  try {
    const body = { text }
    if (att?.image) body.image = att.image
    if (att?.file) body.file = att.file
    const r = await fetch(`${API}/messages`, { method: 'POST', headers: { ...auth(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!r.ok) throw new Error('post')
    const { message } = await r.json()
    pendingLocal = pendingLocal.filter((x) => x !== local)
    if (!msgs.some((m) => m.id === message.id)) { msgs.push(message); lastTs = Math.max(lastTs, message.ts) }
    render(true)
  } catch {
    pendingLocal = pendingLocal.filter((x) => x !== local)
    textEl.value = text; autosize(); pending = att; paintPreview(); render(true)
    toast('Message not sent. Try again.')
  }
  busy = false; refreshSend()
}
sendBtn.onclick = send
refreshSend()

// ---- boot
if (!TOKEN) {
  $('gate').hidden = false; $('composer').hidden = true; setStatus('off', 'Locked')
} else {
  poll(true).then(loop)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) poll() })
}
