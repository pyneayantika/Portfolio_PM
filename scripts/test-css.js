async function test() {
  const res = await fetch('http://localhost:3000')
  const html = await res.text()
  const match = html.match(/href="(\/_next\/static\/css\/[^"]+)"/)
  if (!match) {
    console.log('No CSS link found in HTML')
    return
  }
  const cssUrl = 'http://localhost:3000' + match[1]
  console.log('Fetching CSS URL:', cssUrl)
  const cssRes = await fetch(cssUrl)
  const cssText = await cssRes.text()
  console.log('Status:', cssRes.status, 'Content-Type:', cssRes.headers.get('content-type'))
  console.log('CSS length:', cssText.length)
  console.log('CSS snippet:', cssText.slice(0, 400))
}

test()
