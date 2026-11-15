import { handleUpload } from '@vercel/blob/client'
import { who } from './_common.js'

// Client-side direct upload of PDFs (up to 20 MB) to Vercel Blob. The client sends its token as clientPayload.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        if (!who({ headers: { 'x-token': clientPayload || '' } })) throw new Error('unauthorized')
        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {},
    })
    res.json(json)
  } catch {
    res.status(400).json({ error: 'upload not allowed' })
  }
}
