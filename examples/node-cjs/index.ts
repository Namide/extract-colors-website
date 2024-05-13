import getPixels from "get-pixels"
import { extractColors } from 'extract-colors'

const src = `https://picsum.photos/seed/${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}/640/480`

getPixels(src, (err, pixels) => {
  if(!err) {
    const data = [...pixels.data]
    const [width, height] = pixels.shape

    extractColors({ data, width, height })
      .then(colors => colors.map(({ hex }) => hex))
      .then(console.log)
      .catch(console.log)
  }
})
