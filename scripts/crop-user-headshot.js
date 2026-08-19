const sharp = require('sharp')
const path = require('path')

const inputPath = 'C:/Users/ayant/.gemini/antigravity-ide/brain/67961d5f-6482-446a-9678-4287737e0559/.user_uploaded/media_1787172829092.jpg'
const outputPath = path.join(__dirname, '../public/headshot.jpg')

async function cropFace() {
  // Extract face + upper neckline region
  // Image is 747 x 1024
  // Head is centered horizontally around x = 373 (from x=230 to x=515)
  // Hair starts at ~y = 35, chin is at ~y = 200, shoulders at ~y = 300
  // A square crop of 400x400 from x=173, y=20 gives a perfect headshot!
  
  await sharp(inputPath)
    .extract({
      left: 173,
      top: 25,
      width: 400,
      height: 400,
    })
    .resize(500, 500)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath)

  console.log(`Saved cropped face portrait to ${outputPath}`)
}

cropFace().catch(console.error)
