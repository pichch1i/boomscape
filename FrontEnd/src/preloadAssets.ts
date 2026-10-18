import daisyImage from './assets/pict/Daisy.webp'
import blueGlobeThistleImage from './assets/pict/Blue Globe Thistle.webp'
import peachRoseImage from './assets/pict/Peach Rose.webp'
import stripedCarnationImage from './assets/pict/Striped Carnation.webp'
import sunflowerImage from './assets/pict/Sunflower.webp'

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const backgroundAssets = [
  publicAsset('flower-grid-pixel-bg.webp'),
  publicAsset('q1-pixel-garden-bg.webp'),
  publicAsset('q2-pixel-garden-bg.webp'),
  publicAsset('q3-pixel-garden-bg.webp'),
  publicAsset('q4-pixel-garden-bg.webp'),
  publicAsset('q5-pixel-garden-bg.webp'),
  publicAsset('q6-pixel-garden-bg.webp'),
  publicAsset('q7-pixel-garden-bg.webp'),
]

const resultFlowerAssets = [
  sunflowerImage,
  peachRoseImage,
  daisyImage,
  stripedCarnationImage,
  blueGlobeThistleImage,
]

const seenAssets = new Set<string>()

function preloadImage(src: string) {
  if (seenAssets.has(src)) {
    return
  }

  seenAssets.add(src)

  const image = new Image()
  image.decoding = 'async'
  image.src = src
}

export function preloadExperienceAssets() {
  backgroundAssets.forEach(preloadImage)
  resultFlowerAssets.forEach(preloadImage)
}
