import { copyFile, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { deviceWidths, imageWidths, variantPath } from '../lib/cdn-assets.mjs'

const output = 'build/assets'
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })

const videoPaths = []

async function stage(directory) {
  for (const entry of await readdir(join('public', directory), { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await stage(path)
      continue
    }
    if (!entry.isFile()) continue
    const source = join('public', path)
    const destination = join(output, path)
    await mkdir(dirname(destination), { recursive: true })
    await copyFile(source, destination)
    if (path.endsWith('.mp4')) videoPaths.push('/' + path)
    if (!/\.(png|jpe?g|webp)$/i.test(path)) continue
    for (const width of [...imageWidths, ...deviceWidths]) {
      const variant = join(output, variantPath('/' + path, width))
      await mkdir(dirname(variant), { recursive: true })
      await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 75 }).toFile(variant)
    }
  }
}

await stage('')
await writeFile(join(output, '_headers'), '/*\n  Access-Control-Allow-Origin: *\n')
await writeFile(join(output, '404.html'), 'Asset not found\n')
if (videoPaths.length) {
  await copyFile('scripts/cdn-video.mjs', join(output, '_worker.js'))
  await writeFile(join(output, '_routes.json'), JSON.stringify({ version: 1, include: videoPaths, exclude: [] }))
}
