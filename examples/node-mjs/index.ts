import Jimp from "jimp";
import { extractColors } from "extract-colors/lib/extract-colors.mjs";

const src = `https://picsum.photos/seed/${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}/640/480`;

Jimp.read(src).then((image) => {
  extractColors(image.bitmap)
    .then((colors) => colors.map(({ hex }) => hex))
    .then(console.log)
    .catch(console.log);
});
