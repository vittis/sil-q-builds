# Sil-Q Builds

An unofficial Sil-Q 1.5 reference with ten build guides, a compact build library, and a general strategy primer.

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

The included `netlify.toml` uses `npm run build` and publishes `dist`. `public/_redirects` provides the SPA fallback required for direct visits to routes such as `/builds/stealth-assassin`.
