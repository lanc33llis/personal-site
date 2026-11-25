export const deviceWidths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
export const imageWidths = [32, 48, 64, 96, 128, 256, 384]

export function assetUrl(path, origin = process.env.NEXT_PUBLIC_ASSET_ORIGIN || '') {
  return origin.replace(/\/$/, '') + path
}

export function variantPath(path, width) {
  return `/responsive/${width}${path}.webp`
}

export function publicImage(image, path) {
  return process.env.NEXT_PUBLIC_ASSET_ORIGIN ? { ...image, src: assetUrl(path) } : image
}
