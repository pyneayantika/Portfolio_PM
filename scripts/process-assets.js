const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const animeSrc = 'C:/Users/ayant/.gemini/antigravity-ide/brain/67961d5f-6482-446a-9678-4287737e0559/anime_intro_chibi_1787169814221.jpg'
const headshotSrc = 'C:/Users/ayant/.gemini/antigravity-ide/brain/67961d5f-6482-446a-9678-4287737e0559/professional_headshot_1787169834783.jpg'

const guideDir = path.join(__dirname, '../public/guide')
if (!fs.existsSync(guideDir)) {
  fs.mkdirSync(guideDir, { recursive: true })
}

const animeDest = path.join(guideDir, 'anime-intro.png')
const headshotDest = path.join(__dirname, '../public/headshot.jpg')

async function processImages() {
  console.log('Processing anime avatar...')
  
  // Load raw pixels
  const { data, info } = await sharp(animeSrc)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Flood fill / threshold background transparency
  // The background is pure white / off-white
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Check if pixel is near white
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0 // completely transparent
    } else if (r > 225 && g > 225 && b > 225) {
      // Soft edge antialiasing
      const diff = Math.min(255 - r, 255 - g, 255 - b)
      data[i + 3] = Math.min(255, Math.floor((diff / 15) * 255))
    }
  }

  // Save as resized PNG
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  })
    .resize(500, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(animeDest)

  const animeStats = fs.statSync(animeDest)
  console.log(`Anime avatar saved to ${animeDest} (${(animeStats.size / 1024).toFixed(1)} KB)`)

  console.log('Processing professional headshot...')
  await sharp(headshotSrc)
    .resize(600, 600, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(headshotDest)

  const headshotStats = fs.statSync(headshotDest)
  console.log(`Headshot saved to ${headshotDest} (${(headshotStats.size / 1024).toFixed(1)} KB)`)
}

processImages().catch(console.error)
