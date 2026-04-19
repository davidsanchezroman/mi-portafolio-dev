# mi-portafolio-dev — Agent Coordinator

## Project Identity

Personal portfolio for **David E. Sánchez Román**, a professional transitioning into **Data Analysis and Software Engineering**. Built with Astro 5 (SSR) + React 19 + Tailwind CSS 3, deployed on Netlify with Supabase backend. The site showcases data analysis projects, interactive dashboards, and full-stack applications.

**Live focus:** Pivoting content toward data analysis — updating descriptions, skills, and adding data-oriented projects (Power BI, Python, SQL, dashboards).

## Tech Stack

| Layer | Technology | Config File |
|-------|-----------|-------------|
| Framework | Astro 5.x (SSR mode) | `astro.config.mjs` |
| UI Components | React 19 (client-side only) | — |
| Styling | Tailwind CSS 3 + dark mode | `tailwind.config.cjs` |
| Charts | Chart.js + react-chartjs-2 | — |
| Database | Supabase (PostgreSQL) | `src/db/supabase.js` |
| Hosting | Netlify (SSR adapter) | `netlify.toml` |
| Functions | Netlify Serverless | `netlify/functions/` |
| Transitions | Astro Client Router | `BaseLayout.astro` |

## Coding Conventions

### File Types
- **`.astro`** — Default for all pages, layouts, and static components
- **`.jsx`** — ONLY for components requiring `client:load` or React state/hooks
- **`.js`** — Serverless functions and utility modules

### Naming
- Components: `PascalCase.astro` or `PascalCase.jsx`
- Pages: `kebab-case.astro` (Spanish names: `sobre-mi`, `contacto`, `proyectos`)
- Utilities/data: `camelCase.js` or `kebab-case.js`

### Styling Rules
- Always use Tailwind utility classes; avoid inline `style` attributes
- Use custom theme tokens from `tailwind.config.cjs`:
  - Backgrounds: `bg-dark-background` (#1A1A2E), `bg-dark-surface` (#252540)
  - Text: `text-dark-text` (#E0E0E0), `text-dark-text-muted` (#B0B0B0)
  - Accent: `text-accent-blue` (#00ADB5), `hover:text-accent-blue-dark` (#007A80)
  - Borders: `border-dark-border` (#3C3C5C)
- Fonts: `font-sans` (Inter), `font-mono` (Fira Code) — loaded via Google Fonts in `BaseLayout.astro`
- Dark mode is **always on** (`<html class="dark">`)

### Component Patterns
- All pages wrap in a layout: `BaseLayout.astro`, `DashboardLayout.astro`, or `ProjectsLayout.astro`
- Layout receives `title` prop for `<title>` tag
- Interactive cards use Tailwind `group` / `group-hover` pattern
- Buttons: `bg-accent-blue hover:bg-accent-blue-dark text-white font-bold py-3 px-6 rounded-full`
- Transitions: always include `transition-colors duration-300` or `transition-all duration-300`

## Behavioral Rules

1. **Never modify `src/db/supabase.js`** without explicit confirmation — it holds the DB connection
2. **Never expose or log environment variables** (`.env`, `.env.local`)
3. **Never install new dependencies** without stating the reason and getting approval
4. **Always verify `npm run build`** succeeds after structural changes
5. **Keep content in Spanish** — the portfolio audience is Spanish-speaking
6. **Responsive first** — every UI change must work on mobile (375px), tablet (768px), and desktop (1280px+)
7. **Preserve Astro Client Router** transitions — use `data-astro-prefetch` on internal links
8. **Use semantic HTML** — one `<h1>` per page, proper heading hierarchy

## Key Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Production build to ./dist/
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
├── components/
│   ├── Header.astro         # Fixed header + mobile menu + scroll effects
│   ├── Footer.astro         # Footer with GitHub/LinkedIn links
│   ├── DashboardClient.jsx  # React: Chart.js dashboard (client:load)
│   ├── ChartWrapper.jsx     # React: Chart container component
│   ├── NeuralNetworkBackground.astro  # Canvas animation
│   └── charts/              # Chart.js wrapper components
├── data/
│   └── salesData.json       # Static sales data fallback
├── db/
│   └── supabase.js          # Supabase client (DO NOT modify without approval)
├── layouts/
│   └── BaseLayout.astro     # Main layout (head, header, footer, transitions)
├── pages/
│   ├── index.astro          # Landing page (hero + skills)
│   ├── sobre-mi.astro       # About me (bio + career transition narrative)
│   ├── proyectos.astro      # Projects showcase (cards with hover effects)
│   ├── contacto.astro       # Contact form (Netlify Forms)
│   └── dashboard.astro      # Sales dashboard (Supabase → Chart.js)
└── styles/
    └── global.css           # Tailwind directives
```

## Skills Directory

Agent skills are located in `.agents/skills/`. Each skill is loaded on-demand when the task matches its domain. Available skills:

| Skill | When to Use |
|-------|-------------|
| `astro-components` | Creating/modifying Astro or React components |
| `tailwind-theming` | Styling, colors, responsive design, animations |
| `supabase-integration` | Database queries, data fetching, Supabase client |
| `netlify-deploy` | Build config, serverless functions, deployment |
| `seo-optimization` | Meta tags, Open Graph, schema markup, accessibility |
| `performance-audit` | Lighthouse scores, image optimization, bundle size |
| `security` | Secrets management, input validation, CSP headers, dependency auditing |

## Owner Context

- **Name:** David E. Sánchez Román
- **Location:** Santiago, Chile
- **Background:** Operations management, logistics → transitioning to Data Analysis & Software Engineering
- **University:** CIISA (Ingeniería en Informática)
- **GitHub:** github.com/davidsanchezroman
- **LinkedIn:** linkedin.com/in/david-sanchez-roman-817022320
- **Email:** dsanchezroman9@gmail.com
