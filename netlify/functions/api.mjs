import 'dotenv/config'
import serverless from 'serverless-http'
import { createApp } from '../../server/app.js'

const app = createApp()

/** Netlify Functions adapter — same Express app as local `node server/index.js` (without static `dist`). */
export const handler = serverless(app, {
  binary: ['multipart/form-data', 'image/*', 'application/octet-stream'],
})
