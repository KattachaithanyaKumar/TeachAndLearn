import 'dotenv/config'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createApp } from './app.js'

const PORT = Number(process.env.PORT) || 3001
const app = createApp()

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '../dist')
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Admin API listening on http://localhost:${PORT}`)
})
