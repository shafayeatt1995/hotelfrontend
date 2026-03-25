const { parseString } = require('xml2js')

const API_KEY = 'd674e6eb3082473db649f5dac2e76911'
const HOST = 'colozai.com'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => (err ? reject(err) : resolve(result)))
  })
}

async function main() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`)
  const xml = await fetch(SITEMAP_URL).then((r) => r.text())
  const parsed = await parseXML(xml)

  const urls = (parsed.urlset?.url || []).map((entry) => entry.loc[0])
  console.log(`Found ${urls.length} URLs in sitemap`)

  if (!urls.length) {
    console.log('No URLs to submit.')
    return
  }

  for (let key = 0; key < urls.length; key++) {
    const url = urls[key]
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: API_KEY, keyLocation: KEY_LOCATION, urlList: [url] }),
    })

    const statusMessages = {
      200: 'Submitted successfully',
      202: 'Accepted',
      400: 'Bad request - Invalid format',
      403: 'Forbidden - Key not valid',
      422: 'Unprocessable Entity - URLs mismatch',
      429: 'Too Many Requests - Rate limited',
    }

    if (res.ok) {
      console.log(`${key + 1}) ${res.status} => ${url}`)
      continue
    }

    const msg = statusMessages[res.status] || 'Unknown response'
    const body = await res.text()
    console.log(`${key + 1}) ${res.status} => ${url} (${msg})`)
    if (body) console.log(`Response: ${body}`)
  }

  console.log('\nDone!')
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
