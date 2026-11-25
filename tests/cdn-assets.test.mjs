import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { assetUrl, variantPath } from '../lib/cdn-assets.mjs'

test('asset URLs work locally and on an immutable Cloudflare deployment', () => {
  assert.equal(assetUrl('/icons/icon.png', ''), '/icons/icon.png')
  assert.equal(assetUrl('/icons/icon.png', 'https://abc.example.pages.dev/'), 'https://abc.example.pages.dev/icons/icon.png')
})

test('responsive widths map to distinct files and preserve the original extension', () => {
  assert.equal(variantPath('/photos/work.jpg', 640), '/responsive/640/photos/work.jpg.webp')
  assert.notEqual(variantPath('/work.jpg', 640), variantPath('/work.png', 640))
})

test('staged assets match public originals and include responsive images and CORS headers', async () => {
  const file = 'alexa-device-sorting'
  assert.deepEqual(await readFile('build/assets/' + file + '.mp4'), await readFile('public/' + file + '.mp4'))
  const variant = await readFile('build/assets' + variantPath('/linkage.png', 640))
  assert.equal(variant.toString('ascii', 8, 12), 'WEBP')
  assert.match(await readFile('build/assets/_headers', 'utf8'), /Access-Control-Allow-Origin: \*/)
  await assert.rejects(readFile('build/assets/.DS_Store'), {code: 'ENOENT'})
})
