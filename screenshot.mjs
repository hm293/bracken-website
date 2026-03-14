import puppeteer from 'puppeteer'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const url = process.argv[2] || 'http://localhost:3000'
const label = process.argv[3] || ''

const screenshotDir = join(__dirname, 'temporary screenshots')
if (!existsSync(screenshotDir)) mkdirSync(screenshotDir)

// Auto-increment screenshot number
const existing = readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'))
const numbers = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0'))
const next = numbers.length ? Math.max(...numbers) + 1 : 1

const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`
const filepath = join(screenshotDir, filename)

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

// Wait for fonts to load
await new Promise(r => setTimeout(r, 1500))

// Scroll through the page to trigger all Intersection Observer reveals
await page.evaluate(async () => {
  const totalHeight = document.body.scrollHeight
  const step = 400
  for (let pos = 0; pos < totalHeight; pos += step) {
    window.scrollTo(0, pos)
    await new Promise(r => setTimeout(r, 100))
  }
  // Scroll back to top for the final screenshot
  window.scrollTo(0, 0)
  await new Promise(r => setTimeout(r, 500))
})

// Wait for all transitions to complete
await new Promise(r => setTimeout(r, 1500))

const fullPage = !process.argv[4] || process.argv[4] !== 'viewport'
await page.screenshot({ path: filepath, fullPage })
console.log(`Screenshot saved: ${filepath}`)

await browser.close()
