# qrcode-cloudflare-worker

This is a serveless function on Cloudflare to generate QR Code using the [qr-image](https://www.npmjs.com/package/qr-image) package.

Cloudflare Workers is a platform that allows developers to run their own code on Cloudflare's network of data centers.

# How to deploy on CloudFlare
1. Create an account with Cloudflare.
2. Install the command line interface from Cloudflare called Wrangler by typing `npm install -g wrangler` in your terminal.
3. Type `wrangler login` in the terminal and follow the steps to log in.
3a. Run `npm install --save qr-image`
4. Navigate to the repo in your terminal and deploy with `wrangler publish`.
5. Go to the Cloudflare Worker Dashboard to find the link of your worker. The name should be qrcode-cloudflare-worker.


# How to use
The endpoint expects a ~~POST~~ GET request with variable `message` set to the text e.g. `https://cloudflare-qrcode.<ur-account>.workers.dev/?message=https://github.com`



