# Claude / Antigravity Session Instructions

> **Source of truth:** See `AGENTS.md` for the full project context, coding conventions, and behavioral rules.

## Quick Reference

- **Stack:** Astro 5 (SSR) + React 19 + Tailwind 3 + Supabase + Netlify
- **Language:** Site content in Spanish; code comments in Spanish or English
- **Dark mode:** Always on (`<html class="dark">`)
- **Owner:** David E. Sánchez Román — transitioning to Data Analysis

## Session Workflow

1. **Read `AGENTS.md`** at the start of every session for full context
2. **Identify the task type** and activate relevant skills from `.agents/skills/`
3. **Propose before acting** — for structural changes, create an implementation plan artifact first
4. **Verify builds** — run `npm run build` after any structural change
5. **Test responsive** — verify mobile (375px), tablet (768px), desktop (1280px+)

## Critical Rules (from AGENTS.md)

- Never modify `src/db/supabase.js` without explicit approval
- Never install dependencies without stating the reason
- Keep content in Spanish
- Use Tailwind theme tokens (not raw hex values)
- Every page must have one `<h1>` and proper heading hierarchy
- Use `data-astro-prefetch` on all internal links

## Skills Available

Skills in `.agents/skills/` provide specialized context. Load them when needed:

- `astro-components` — Component creation and patterns
- `tailwind-theming` — Design system and styling
- `supabase-integration` — Database and data fetching
- `netlify-deploy` — Build and deployment
- `seo-optimization` — SEO and meta tags
- `performance-audit` — Performance optimization
- `security` — Secrets, input validation, CSP headers, dependency auditing
