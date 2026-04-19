---
name: performance-audit
description: Performance optimization, Lighthouse scoring, image optimization, and Core Web Vitals
---

# Performance Audit Skill

## When to Use
Activate when optimizing page load speed, preparing for production, or troubleshooting slow pages.

## Current Performance Concerns

1. **Large images**: `FotoCVSinFondo.png` is 2.7MB (unoptimized PNG)
2. **Google Fonts**: Loaded externally (render-blocking)
3. **Power BI iframe**: Heavy third-party embed on projects page
4. **Chart.js bundle**: Loaded client-side via React

## Image Optimization

### Target Formats
| Format | Use Case |
|--------|----------|
| WebP | Photos, thumbnails (90% size reduction vs PNG) |
| AVIF | Best compression (if browser support is acceptable) |
| SVG | Icons, logos |

### Optimization Steps
1. Convert `FotoCVSinFondo.png` (2.7MB) → WebP (~200KB)
2. Convert `dev.jpg` (797KB) → WebP (~150KB)
3. Use Astro's `<Image>` component for automatic optimization:
   ```astro
   ---
   import { Image } from 'astro:assets';
   import profilePic from '../assets/profile.webp';
   ---
   <Image src={profilePic} alt="Profile" width={160} height={160} />
   ```

### Lazy Loading
- Add `loading="lazy"` to images below the fold
- Hero/profile images: keep `loading="eager"` (above fold)

## Font Loading Strategy

Current (render-blocking):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet">
```

Optimized:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
```

## Lighthouse Target Scores

| Metric | Target | Current Risk |
|--------|--------|-------------|
| Performance | > 90 | ⚠️ Large images, external fonts |
| Accessibility | > 95 | ⚠️ Missing alt texts, contrast |
| Best Practices | > 90 | ✅ Should be fine |
| SEO | > 90 | ⚠️ Missing meta descriptions |

## Core Web Vitals

| Metric | Target | How to Achieve |
|--------|--------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | Optimize hero image, preload fonts |
| FID (First Input Delay) | < 100ms | Minimize client-side JS |
| CLS (Cumulative Layout Shift) | < 0.1 | Set explicit image dimensions |

## Bundle Size

Keep client-side JS minimal:
- Chart.js + react-chartjs-2 are heavy (~200KB) — only load on dashboard page
- Use `client:load` (not `client:idle`) for critical interactive components
- Use `client:visible` for components below the fold

## Rules

1. Set `width` and `height` on all `<img>` tags to prevent CLS
2. Use WebP/AVIF for all raster images
3. Preconnect to external domains (fonts, Supabase)
4. Lazy-load images below the fold
5. Keep client-side JS bundles under 200KB per page
