import assert from 'node:assert/strict'
import test from 'node:test'
import worker from '../scripts/cdn-video.mjs'

const body = '0123456789'
const env = { ASSETS: { fetch: () => new Response(body, {headers: {'content-length': '10', 'content-type': 'video/mp4', etag: '"abc"'}}) } }
for (const [range, status, expected, contentRange] of [
  ['bytes=2-4', 206, '234', 'bytes 2-4/10'],
  ['bytes=-2', 206, '89', 'bytes 8-9/10'],
  ['bytes=8-', 206, '89', 'bytes 8-9/10'],
  ['bytes=10-', 416, '', 'bytes */10'],
  ['unknown', 200, body, null],
]) {
  test(range, async () => {
    const request = new Request('https://assets.example/video.mp4', {headers: {range}})
    const response = await worker.fetch(request, env)
    assert.equal(response.status, status)
    assert.equal(response.headers.get('content-range'), contentRange)
    assert.equal(await response.text(), expected)
  })
}
