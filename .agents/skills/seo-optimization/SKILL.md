---
name: seo-optimization
description: SEO technical best practices, meta tags, Open Graph, schema markup, and accessibility
---

# SEO Optimization Skill

## When to Use
Activate when adding/editing pages, updating content, or preparing for production launch.

## Current State

**Missing from the project:**
- No `<meta name="description">` on any page
- No Open Graph tags
- No Twitter Card tags
- No structured data (JSON-LD)
- No sitemap.xml
- No robots.txt

## Required Meta Tags per Page

```astro
<!-- In BaseLayout.astro <head> -->
<meta name="description" content={description} />
<meta name="author" content="David E. Sánchez Román" />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:locale" content="es_CL" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="/og-image.jpg" />
```

## Page-Specific Descriptions

| Page | Title | Description |
|------|-------|-------------|
| index | Mi Portafolio - David Sánchez Román | Portafolio profesional de David Sánchez Román. Analista de datos y desarrollador full-stack en Santiago, Chile. |
| sobre-mi | Sobre Mí - David Sánchez Román | Conoce la trayectoria profesional de David Sánchez Román, su transición al análisis de datos y desarrollo de software. |
| proyectos | Proyectos - David Sánchez Román | Proyectos de análisis de datos, dashboards interactivos y aplicaciones web por David Sánchez Román. |
| contacto | Contacto - David Sánchez Román | Contacta a David Sánchez Román para proyectos de análisis de datos o desarrollo web. Santiago, Chile. |
| dashboard | Dashboard de Ventas - David Sánchez Román | Dashboard interactivo de análisis de ventas con visualizaciones en tiempo real usando Chart.js y Supabase. |

## Schema Markup (JSON-LD)

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "David E. Sánchez Román",
    "url": "https://YOUR-DOMAIN.netlify.app",
    "jobTitle": "Data Analyst & Full-Stack Developer",
    "alumniOf": "CIISA",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago",
        "addressCountry": "CL"
    },
    "sameAs": [
        "https://github.com/davidsanchezroman",
        "https://linkedin.com/in/david-sanchez-roman-817022320"
    ]
}
</script>
```

## Heading Hierarchy Rules

Each page must have exactly **one `<h1>`** and proper nesting:

```
<h1> Page Title (one per page)
  <h2> Section Title
    <h3> Subsection / Card Title
```

## Accessibility Checklist

- All images have descriptive `alt` text
- All form inputs have `<label>` elements
- Interactive elements are keyboard-accessible
- Color contrast meets WCAG AA (4.5:1 for text)
- `aria-label` on icon-only buttons (e.g., mobile menu)
- Language attribute: `<html lang="es">`

## Sitemap & Robots

Install `@astrojs/sitemap`:
```bash
npx astro add sitemap
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://YOUR-DOMAIN.netlify.app/sitemap-index.xml
```

## Rules

1. Every page needs a unique `<title>` and `<meta description>`
2. One `<h1>` per page — no exceptions
3. All images need `alt` attributes
4. Use semantic HTML (`<section>`, `<nav>`, `<main>`, `<footer>`)
5. Internal links use descriptive text (not "click here")
