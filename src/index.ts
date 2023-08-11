/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

const qr = require("qr-image")

const landing = `
<h1>QR Generator</h1>
<p>This is a serveless function on Cloudflare to generate QR Code using the <a href="https://www.npmjs.com/package/qr-image">qr-image</a>. package. </p>
<h1>How to use</h1>
<p>send a post request with json body {text: "your content to turn into qr code"} to the above link. The response is "Content-Type": "image/png" </p>
`

async function fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	if (request.method === "GET") {
	  return generate(request)
	}
	return new Response(landing, {
		headers: {
		  "Content-Type": "text/html"
		}
	})
  }
  
  async function generate(request: Request): Promise<Response> {
	const { text  }: { text: any } = await request.json()
	console.log(text)
	const headers = { 
		"Content-Type": "image/png",
		"Content-Disposition": "inline; filename=qrcode.png"
	}
	const qr_png = qr.imageSync(text || "you didn't send anything in the text object")
	return new Response(qr_png, { headers })
  }
  
  export default { fetch }
