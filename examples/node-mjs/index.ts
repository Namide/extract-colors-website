import Jimp from "jimp";
import { extractColors } from 'extract-colors/lib/extract-colors.mjs'

const src = `https://loremflickr.com/640/480?lock=${ Math.floor(Math.random() * 0xFFFFFF) }`

Jimp.read(src)
  .then((image) => {
    extractColors(image.bitmap)
      .then(colors => colors.map(({ hex }) => hex))
      .then(console.log)
      .catch(console.log)
  })
  .catch((err) => {
    // Handle an exception.
  });
