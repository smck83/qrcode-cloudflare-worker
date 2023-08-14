/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const qr = require("qr-image")

const landing = `
<h1>QR Generator</h1>
<p>This is a serverless function on Cloudflare to generate QR Codes using the <a href="https://www.npmjs.com/package/qr-image">qr-image</a> package.</p>
<h1>How to use</h1>
<p>Send a GET request with a query parameter named "message" to this link. The response will be a QR code image.</p>
`

async function fetch(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const text = url.searchParams.get("message")

  if (text) {
    return generate(text)
  }

  return new Response(landing, {
    headers: {
      "Content-Type": "text/html"
    }
  })
}

async function generate(text: string): Promise<Response> {
  const headers = { 
    "Content-Type": "image/png",
    "Content-Disposition": "inline; filename=qrcode.png"
  }
  const qr_png = qr.imageSync(text)
  return new Response(qr_png, { headers })
}

export default { fetch }
