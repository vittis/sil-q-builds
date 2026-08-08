# Sil-Q Builds

An unofficial Sil-Q 1.5 reference with eleven build guides, a compact build library, and a general strategy primer.

## Local development

```sh
npm install
npm run dev
```

## Verification

```sh
npm test
npm run build
```

The production build is written to `dist/`.

## Content

- Build records: `src/data/builds.ts`
- General primer: `src/data/primer.ts`
- Source catalog: `src/data/sources.ts`
- Content types: `src/data/types.ts`

Build and primer pages are derived from these typed records; there is no backend or runtime content fetch.

## Netlify

The included `netlify.toml` uses `npm run build`, publishes `dist`, and provides the SPA fallback required for direct visits to routes such as `/builds/stealth-assassin`.

## Cloudflare

The included `wrangler.jsonc` publishes `dist` as static assets and enables Cloudflare's single-page application fallback. Cloudflare's Git build should use `npm run build` as the build command and `npx wrangler deploy` as the deploy command.

## Vercel

Import the GitHub repository into Vercel and keep the detected Vite settings. The build command is `npm run build` and the output directory is `dist`. The included `vercel.json` rewrites direct visits to application routes to `index.html`, allowing React Router to handle them.
