# arjitlohani.com.np

Personal portfolio of Arjit Lohani — Software Engineer (Salesforce · Apex · LWC · React · Next.js).

## Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- TypeScript
- Deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/) static assets

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
npm run build    # outputs static site to ./out
npx wrangler deploy
```

Pushes to `main` deploy automatically via Cloudflare Workers Builds.

## Structure

```
app/          # App Router: layout, page, global styles
components/   # UI sections (Hero, About, Experience, ...)
lib/data.ts   # All site content in one place
public/       # Static assets (images)
```
