---
name: netlify-deploy
description: Build configuration, serverless functions, deployment, and troubleshooting
---

# Netlify Deploy Skill

## When to Use
Activate when configuring builds, creating serverless functions, or troubleshooting deploy errors.

## Current Config

- **Build:** `npm run build` → `dist/`
- **Functions:** `netlify/functions/` (esbuild bundler)
- **SSR:** `@astrojs/netlify` adapter, `output: 'server'`
- **OpenSSL Fix:** `NODE_OPTIONS = "--openssl-legacy-provider"` in `netlify.toml`

## Existing Functions

| Function | File | Purpose |
|----------|------|---------|
| `sales-data` | `netlify/functions/sales-data.js` | Fetch sales data from Supabase |

## Environment Variables

| Variable | Astro (SSR) | Functions |
|----------|------------|-----------|
| `SUPABASE_URL` | `import.meta.env.SUPABASE_URL` | `process.env.SUPABASE_URL` |
| `SUPABASE_KEY` | `import.meta.env.SUPABASE_KEY` | `process.env.SUPABASE_ANON_KEY` |

Local: `.env` / `.env.local` (gitignored). Production: Netlify Dashboard.

## Pre-Deploy Checklist

1. `npm run build` succeeds
2. Environment variables set in Netlify
3. No secrets committed to git
4. Forms have `data-netlify="true"`
5. Internal links have `data-astro-prefetch`

## Common Issues

- **Module not found in function** → Add to `external_node_modules` in `netlify.toml`
- **ERR_OSSL_EVP_UNSUPPORTED** → Already fixed via NODE_OPTIONS
- **SSR 404s** → Verify `output: 'server'` and `adapter: netlify()` in `astro.config.mjs`
- **Form not submitting** → Needs `<input type="hidden" name="form-name" value="contact" />`

## Rules

1. Always test `npm run build` before pushing
2. Never hardcode secrets
3. Include CORS headers in function responses
4. Use CommonJS in functions, ESM in Astro/React
