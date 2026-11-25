// Pages static assets can return a complete MP4 for a byte-range request.
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 200 || request.method !== 'GET') return response
    const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range') || '')
    if (!range || !(range[1] || range[2])) return response
    const validator = request.headers.get('if-range')
    if (validator && validator !== response.headers.get('etag') && validator !== response.headers.get('last-modified')) return response

    const blob = await response.blob()
    const start = range[1] ? Number(range[1]) : Math.max(0, blob.size - Number(range[2]))
    const end = range[1] && range[2] ? Math.min(Number(range[2]), blob.size - 1) : blob.size - 1
    const headers = new Headers(response.headers)
    headers.set('accept-ranges', 'bytes')
    if (start > end) {
      headers.set('content-range', `bytes */${blob.size}`)
      headers.set('content-length', '0')
      return new Response(null, {status: 416, headers})
    }
    headers.set('content-range', `bytes ${start}-${end}/${blob.size}`)
    headers.set('content-length', String(end - start + 1))
    return new Response(blob.slice(start, end + 1), {status: 206, headers})
  },
}
