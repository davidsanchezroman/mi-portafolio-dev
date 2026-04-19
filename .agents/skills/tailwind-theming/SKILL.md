---
name: tailwind-theming
description: Design system, color palette, dark theme, responsive breakpoints, and animation patterns
---

# Tailwind Theming Skill

## When to Use
Activate this skill when working on styling, layout, responsive design, animations, or any visual change.

## Color Palette

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Dark Background | `#1A1A2E` | `bg-dark-background` | Page background |
| Dark Surface | `#252540` | `bg-dark-surface` | Cards, sections, header, footer |
| Dark Border | `#3C3C5C` | `border-dark-border` | Card borders, dividers |
| Dark Text | `#E0E0E0` | `text-dark-text` | Primary text |
| Dark Text Muted | `#B0B0B0` | `text-dark-text-muted` | Secondary/descriptive text |
| Accent Blue | `#00ADB5` | `text-accent-blue` / `bg-accent-blue` | Primary accent, CTAs, headings |
| Accent Blue Dark | `#007A80` | `hover:bg-accent-blue-dark` | Hover states |

### Additional Colors (used in charts/badges)
- `text-green-400` — Positive metrics (total sales)
- `text-blue-400` — Unit counts
- `text-purple-400` — Averages
- `text-orange-400` — Unique items count
- `bg-gray-900` — Project card backgrounds
- `bg-gray-800` — Dashboard metric cards

## Typography

| Role | Font | Tailwind | Weights Available |
|------|------|----------|-------------------|
| Body/UI | Inter | `font-sans` | 300, 400, 600, 700 |
| Code | Fira Code | `font-mono` | 400, 500, 700 |

### Text Size Patterns
- Page title (h1): `text-4xl md:text-5xl font-extrabold text-accent-blue`
- Section title (h2): `text-3xl font-bold text-dark-text`
- Card title (h3): `text-xl md:text-2xl font-semibold text-accent-blue`
- Body text: `text-lg text-dark-text-muted leading-relaxed`
- Small/label: `text-sm text-dark-text-muted`

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Default | < 768px | Mobile-first base styles |
| `md:` | ≥ 768px | Tablet — switch to multi-column grids |
| `lg:` | ≥ 1024px | Desktop — wider layouts |

### Common Grid Patterns
```
<!-- Skills grid -->
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

<!-- Dashboard stats -->
grid grid-cols-1 md:grid-cols-4 gap-6

<!-- Project cards -->
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6

<!-- Chart grid -->
grid grid-cols-1 md:grid-cols-2 gap-8
```

## Component Style Patterns

### Card (Section)
```
bg-dark-surface p-6 rounded-lg shadow-md border border-dark-border
```

### Card (Elevated)
```
bg-dark-surface p-6 md:p-8 rounded-lg shadow-xl border border-dark-border
```

### CTA Button
```
inline-block bg-accent-blue hover:bg-accent-blue-dark
text-white font-bold py-3 px-6 rounded-full text-lg
transition-colors duration-300 transform hover:scale-105
```

### Skill Badge / Tag
```
bg-accent-blue-dark text-white text-sm font-medium px-4 py-2 rounded-full shadow-md
hover:bg-accent-blue transition-colors duration-200
```

### Tech Stack Badge (in project cards)
```
px-3 py-1 text-xs font-semibold bg-{color}-500/20 text-{color}-300 rounded-full border border-{color}-500/50
```

Color mapping for tech badges:
- Blue (`blue`) — React, TypeScript, Astro
- Green (`green`) — Flask, Node.js, Python
- Purple (`purple`) — PostgreSQL, Supabase
- Cyan (`cyan`) — Docker, Tailwind
- Orange (`orange`) — Power BI, Jupyter
- Yellow (`yellow`) — JavaScript
- Red (`red`) — SQL, Data Analysis

### Form Input
```
shadow-sm appearance-none border border-dark-border rounded-lg w-full py-3 px-4
bg-dark-surface text-dark-text leading-tight
focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent
transition-all duration-200
```

### Profile Image
```
mx-auto rounded-full w-40 h-40 object-cover shadow-lg border-4 border-accent-blue
transition-transform duration-300 hover:scale-105
```

## Animation Patterns

### Hover Lift (Project Cards)
```
transform transition-all duration-300 ease-in-out
hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
```

### Hover Blur + Overlay (Image in Card)
```
<!-- Image -->
transition-all duration-300 group-hover:blur-sm

<!-- Overlay -->
absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center
opacity-0 group-hover:opacity-100 transition-opacity duration-300
```

### Color Transition
```
transition-colors duration-200     <!-- Fast: links, badges -->
transition-colors duration-300     <!-- Normal: buttons, backgrounds -->
```

### Scale on Hover
```
transition-transform duration-300 hover:scale-105    <!-- Subtle -->
transition-all duration-300 hover:scale-[1.01]       <!-- Very subtle -->
```

## Scrollbar Styling (defined in BaseLayout.astro)
```css
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #252540; }
::-webkit-scrollbar-thumb { background: #00ADB5; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #007A80; }
```

## Rules

1. **Never use raw hex values** — always use Tailwind theme tokens
2. **Always include transitions** on interactive elements
3. **Mobile-first** — write base styles for mobile, then add `md:` and `lg:` overrides
4. **Dark mode is always on** — do not add `dark:` prefixes (unnecessary)
5. **Container width** — use `container mx-auto px-4` for page content
6. **Spacing consistency** — sections use `py-12`, cards use `p-6 md:p-8`, main content has `pt-20` (for fixed header)
