import * as Vibrant from 'node-vibrant/dist/vibrant'
import { extractColors } from 'extract-colors'

const contentElement = document.body.querySelector('#content') as HTMLDivElement

const IMG_THEME = [/* 'moon',*/ 'water', 'sea', 'colors', 'sky']

const getRandImg = (id) => {
  const index = Math.round(Math.random() * 20) + 5
  const seed = IMG_THEME[id % IMG_THEME.length]
  return `https://loremflickr.com/640/480/${seed}/?lock=${index}`
}

type Option = {
  src: string,
  time: number,
  tools: {
    title: string,
    colors: string[],
    time: number
  }[]
}

const getHtmlContent = ({ src, tools, time }: Option) => `<div class="card w-full lg:w-[calc(50%-15px)] xl:w-[calc(33%-15px)] bg-base-100 shadow-xl">
          
  <div class="relative rounded-xl mb-2 overflow-hidden">
    <figure>
      <img crossorigin="anonymous" width="640" height="480" alt="image" class="w-full" src="${ src }">
    </figure>
  </div>

  <div class="card-body text-base-content relative">
    <p class="absolute -top-2 left-4 text-shadow text-white text-sm -translate-y-full">Random image from Unsplash</p>

    <p>Image load time ${ (time / 1000).toFixed(1) } sec</p>

    ${ tools.map(({ colors, time, title }) => `<h2 class="card-title">
        ${ title }
        </h2>
        <div>
          <span>${ colors.length } colors</span>
          <span class="badge badge-accent align-text-top font-bold">
            ${ time }ms
          </span>
        </div>
        <div class="card-actions justify-start">

          <ul class="flex justify-left flex-wrap gap-2">
            ${ colors.map(color => `<li class="leading-[0]">
              <span class="w-6 h-6 rounded-xl block border border-black border-opacity-20" style="background-color: ${ color };"></span>
            </li>`).join('') }
          </ul>

        </div>`).join('')
    }
  </div>
</div>`

const COUNT = 5;
const wait = (time: number) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const getExtractColor = async (image: HTMLImageElement) => {
  let toolTime = Date.now()
  const colors = await extractColors(image, { crossOrigin: 'anonymous' })
  toolTime = (Date.now() - toolTime)

  return {
    title: 'extract-colors',
    colors: colors.map(color => color.hex),
    time: toolTime
  }
}

const getNodeVibrant = async (image: HTMLImageElement) => {
  let toolTime = Date.now()
  const v = new Vibrant(image)
  // v.getPalette((err, palette) => console.log(palette))
  // Promise
  const palette = await v.getPalette()
  toolTime = (Date.now() - toolTime)

  return {
    title: 'node-vibrant',
    colors: Object.keys(palette).map(name => `rgb(${ palette[name].rgb.join(',') })`),
    time: toolTime
  }
}

const process = async () => {

  for (let src of (new Array(COUNT)).fill(true).map((_, id) => getRandImg(id))) {

    const tools: Option["tools"] = []
    let imgTime = Date.now()

    const image: HTMLImageElement = await new Promise(resolve => {
      const initTime = Date.now()
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = src
      if (image.complete) {
        resolve(image)
      } else {
        image.addEventListener("load", () => { resolve(image) })
      }
    })
    imgTime = (Date.now() - imgTime)  

    await wait(100)
    
    tools.push(await getNodeVibrant(image))
    
    await wait(100)

    tools.push(await getExtractColor(image))

    await wait(100)

    contentElement.innerHTML += getHtmlContent({ src, tools, time: imgTime })
  }      
}

process()
