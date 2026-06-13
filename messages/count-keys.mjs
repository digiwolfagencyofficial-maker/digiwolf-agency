import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TOP_NAMESPACES = [
  '_meta',
  'nav',
  'footer',
  'common',
  'home',
  'services',
  'pricing',
  'contact',
  'book',
  'about',
  'process',
  'work',
  'blog',
  'caseStudies',
  'legal',
  'chat',
  'cookieBanner',
  'meta',
]

function countLeafStrings(value) {
  if (value === null || value === undefined) return 0
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return 1
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countLeafStrings(item), 0)
  }
  if (typeof value === 'object') {
    return Object.values(value).reduce((sum, v) => sum + countLeafStrings(v), 0)
  }
  return 0
}

const files = ['en.json', 'mn.json', 'cs.json']
const results = {}

for (const file of files) {
  const filePath = path.join(__dirname, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const counts = {}
  let total = 0
  for (const ns of TOP_NAMESPACES) {
    const count = data[ns] ? countLeafStrings(data[ns]) : 0
    counts[ns] = count
    total += count
  }
  counts.TOTAL = total
  results[file] = counts
}

console.log('\n=== Translation key counts by namespace ===\n')
for (const file of files) {
  console.log(`--- ${file} ---`)
  const counts = results[file]
  for (const ns of [...TOP_NAMESPACES, 'TOTAL']) {
    console.log(`  ${ns.padEnd(16)} ${counts[ns]}`)
  }
  console.log('')
}

export { results }
