---
name: security
description: Cybersecurity best practices, secrets management, input validation, headers, and vulnerability prevention
---

# Security Skill

## When to Use
Activate this skill when:
- Handling user input (forms, URL params, query strings)
- Working with environment variables or secrets
- Adding third-party scripts, iframes, or external resources
- Creating or modifying serverless functions
- Reviewing code before deployment
- Any change touching authentication, data, or external APIs

## Attack Surface of This Project

```
User Input                    External Resources
    │                               │
    ▼                               ▼
┌─────────────────┐     ┌────────────────────┐
│ Contact Form    │     │ Google Fonts CDN   │
│ (Netlify Forms) │     │ Power BI iframe    │
└────────┬────────┘     │ Supabase API       │
         │              └────────────────────┘
         ▼
┌─────────────────┐     ┌────────────────────┐
│ Astro SSR       │────▶│ Supabase Client    │
│ (Server-side)   │     │ (supabase.js)      │
└────────┬────────┘     └────────────────────┘
         │
         ▼
┌─────────────────┐
│ Netlify         │
│ Functions (API) │
└─────────────────┘
```

## Current Vulnerabilities & Fixes

### ✅ FIXED: `.env.local` now in `.gitignore`

The file `.env.local` was previously committed to Git (commit `007f371`) and was not listed in `.gitignore`. This has been fixed:
- `.env.local` added to `.gitignore`
- File removed from Git tracking via `git rm --cached`
- **⚠️ Supabase keys must be rotated** since they were exposed in public Git history

### 🟡 MEDIUM: No Content Security Policy (CSP) headers

The site has no CSP headers, allowing potential XSS via injected scripts.

**Fix:** Add security headers in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://app.powerbi.com; connect-src 'self' https://*.supabase.co"
```

### 🟡 MEDIUM: No rate limiting on contact form

Netlify Forms provides basic spam protection, but the honeypot field is the only defense.

**Current protection (keep):**
```html
<input type="hidden" name="bot-field" />
```

### 🟢 LOW: External links missing `noreferrer`

Some external links have `noopener` but not `noreferrer`.

**Pattern for all external links:**
```html
<a href="URL" target="_blank" rel="noopener noreferrer">
```

## Secrets Management

### Rules
1. **Never commit secrets** — all `.env*` files must be in `.gitignore`
2. **Never log secrets** — no `console.log(process.env.SUPABASE_KEY)`
3. **Use environment variables** — never hardcode API keys, URLs, or tokens
4. **Separate keys by environment** — different keys for dev vs production

### Environment Variable Inventory

| Variable | Where Used | Sensitivity |
|----------|-----------|-------------|
| `SUPABASE_URL` | SSR + Functions | Medium (public, but don't expose) |
| `SUPABASE_KEY` | SSR (Astro) | High (anon key — limit via RLS) |
| `SUPABASE_ANON_KEY` | Functions | High (same as above) |

### Supabase Row Level Security (RLS)

Always verify RLS is enabled on Supabase tables:
- `sales_data` → Should have read-only policy for anon key
- New tables → Enable RLS immediately after creation
- Never use the `service_role` key in client-side or SSR code

## Input Validation

### Contact Form
The contact form in `contacto.astro` uses Netlify Forms (server-processed), which provides:
- ✅ Honeypot field (`bot-field`)
- ✅ Server-side processing (not client-side)
- ⚠️ No client-side validation beyond `required` attribute

**Best practice for form inputs:**
```html
<input type="email" name="email" required
       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
       maxlength="254" />
<textarea name="message" required maxlength="2000"></textarea>
```

### URL Parameters / Query Strings
If adding dynamic routes or query-based filtering:
- **Always sanitize** user input before using in database queries
- **Never** interpolate user input into SQL — use Supabase's parameterized queries
- **Validate types** — ensure numbers are numbers, dates are dates

```javascript
// ✅ SAFE — Supabase parameterized query
const { data } = await supabase
    .from('table')
    .select('*')
    .eq('category', userInput);

// ❌ DANGEROUS — Never do this
const { data } = await supabase.rpc('custom_query', {
    raw_sql: `SELECT * WHERE category = '${userInput}'`
});
```

## Security Headers

### Recommended `netlify.toml` Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    # Prevent clickjacking
    X-Frame-Options = "DENY"
    # Prevent MIME sniffing
    X-Content-Type-Options = "nosniff"
    # Control referrer information
    Referrer-Policy = "strict-origin-when-cross-origin"
    # Disable unnecessary browser features
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

### CSP for This Project

The Content Security Policy must allow:
- `'self'` — own domain scripts/styles
- `'unsafe-inline'` — Astro's inline scripts and styles
- `fonts.googleapis.com` + `fonts.gstatic.com` — Google Fonts
- `app.powerbi.com` — Power BI iframe embeds
- `*.supabase.co` — Supabase API calls

## Third-Party Resources

| Resource | Risk | Mitigation |
|----------|------|------------|
| Google Fonts | Low | Loaded via `<link>`, no JS |
| Power BI iframe | Medium | Sandboxed, use CSP `frame-src` |
| Supabase JS SDK | Low | Official SDK, use RLS |
| Chart.js | Low | Client-side only, no external calls |

## Pre-Deploy Security Checklist

- [ ] All `.env*` files are in `.gitignore`
- [ ] No secrets in committed code (`grep -r "SUPABASE" --include="*.js" --include="*.astro"`)
- [ ] Supabase RLS enabled on all tables
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Form has honeypot field and server-side validation
- [ ] Security headers configured in `netlify.toml`
- [ ] No `console.log` with sensitive data
- [ ] Dependencies up to date (`npm audit`)

## Dependency Security

Run periodically:
```bash
npm audit              # Check for known vulnerabilities
npm audit fix          # Auto-fix compatible updates
npm outdated           # Check for outdated packages
```

## Rules

1. **Never commit secrets** — verify `.gitignore` covers all env files
2. **Sanitize all user input** — even if it goes through Netlify Forms
3. **Use parameterized queries** — never interpolate user input into queries
4. **Add security headers** — CSP, X-Frame-Options, X-Content-Type-Options
5. **Keep dependencies updated** — run `npm audit` before each deploy
6. **Enable RLS on every Supabase table** — never expose data without policies
7. **External links** — always use `rel="noopener noreferrer"` with `target="_blank"`
8. **Review before deploy** — run the security checklist above
