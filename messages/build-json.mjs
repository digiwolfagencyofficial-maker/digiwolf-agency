import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const locales = [
  { file: 'en.js', out: 'en.json' },
  { file: 'mn.js', out: 'mn.json' },
  { file: 'cs.js', out: 'cs.json' },
]

for (const { file, out } of locales) {
  const mod = await import(`./locales/${file}`)
  const json = JSON.stringify(mod.default, null, 2) + '\n'
  fs.writeFileSync(path.join(__dirname, out), json, 'utf8')
  console.log(`Wrote ${out}`)
}
