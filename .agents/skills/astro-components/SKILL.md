---
name: astro-components
description: Guidelines for creating and modifying Astro and React components in the portfolio
---

# Astro Components Skill

## When to Use
Activate this skill when creating new components, modifying existing ones, or adding new pages to the portfolio.

## Component Decision Tree

```
Need a new UI element?
├── Is it purely presentational (no JS interactivity)?
│   └── Create .astro component
├── Does it need client-side state, hooks, or event handlers beyond simple DOM events?
│   └── Create .jsx component with client:load directive
└── Is it a page route?
    └── Create .astro file in src/pages/
```

## Astro Component Template

```astro
---
// src/components/MyComponent.astro
interface Props {
    title: string;
    description?: string;
}

const { title, description = '' } = Astro.props;
---

<section class="bg-dark-surface p-6 rounded-lg shadow-md border border-dark-border">
    <h3 class="text-xl font-semibold text-accent-blue mb-2">{title}</h3>
    {description && (
        <p class="text-dark-text-muted">{description}</p>
    )}
    <slot />
</section>
```

## React Component Template (client-side only)

```jsx
// src/components/MyInteractiveComponent.jsx
import React, { useState } from 'react';

export function MyInteractiveComponent({ initialData }) {
    const [data, setData] = useState(initialData);

    return (
        <div className="bg-dark-surface p-6 rounded-xl shadow-md border border-dark-border">
            {/* Component content */}
        </div>
    );
}
```

**Usage in .astro file:**
```astro
---
import { MyInteractiveComponent } from '../components/MyInteractiveComponent.jsx';
---
<MyInteractiveComponent initialData={someData} client:load />
```

## Page Template

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
// Data fetching happens here (server-side)
---

<BaseLayout title="Page Title - David Sánchez Román">
    <section class="py-12 px-6 md:px-8 lg:px-10 bg-dark-surface rounded-lg shadow-xl mb-10 border border-dark-border">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-extrabold text-accent-blue mb-6">Page Title</h1>
            <!-- Content -->
        </div>
    </section>
</BaseLayout>
```

## Existing Layouts

| Layout | File | Used By |
|--------|------|---------|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | index, sobre-mi, contacto |
| `DashboardLayout` | `src/layouts/DashboardLayout.astro` | dashboard |
| `ProjectsLayout` | `src/layouts/ProjectsLayout.astro` | proyectos |

## Project Card Pattern

When adding a new project card to `proyectos.astro`, follow this structure:

```astro
<a href="URL" target="_blank" rel="noopener noreferrer"
   class="group block relative overflow-hidden rounded-lg shadow-xl cursor-pointer
          transform transition-all duration-300 ease-in-out
          hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]">
    <div class="project-card relative p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-900">
        <div class="flex-1 text-white">
            <h3 class="text-2xl font-semibold text-accent-blue mb-2 group-hover:text-accent-blue-dark transition-colors duration-200">
                Project Title
            </h3>
            <p class="text-gray-300 mb-4">Project description.</p>
            <!-- Tech stack badges -->
            <div class="flex flex-wrap gap-2 mb-3">
                <span class="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/50">Tech</span>
            </div>
        </div>
        <div class="md:w-1/3 flex justify-center items-center">
            <img src="/project-thumbnail.jpg" alt="Project thumbnail"
                 class="w-full max-w-[200px] md:max-w-full h-auto rounded-md object-cover border border-cyan-700/50
                        transition-all duration-300 group-hover:blur-sm"/>
        </div>
        <div class="project-overlay absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-white text-xl font-bold p-4 rounded-md border-2 border-accent-blue">Ver Proyecto</span>
        </div>
    </div>
</a>
```

## Data Analysis Project Card

Since David is transitioning to data analysis, new projects should emphasize:
- Data visualization (Chart.js, Power BI embeds)
- Tech stack badges for: Python, SQL, Power BI, Pandas, Jupyter, etc.
- Links to live dashboards or embedded iframes when possible
- Clear descriptions of the data problem solved

## Rules

1. Always type Props interfaces in Astro frontmatter
2. Use `data-astro-prefetch` on all internal `<a>` links
3. Images in `public/` — reference as `/filename.ext`
4. Wrap client-side React components with `client:load` (not `client:only`)
5. Use `ChartWrapper` component when adding new Chart.js charts
6. Scripts that need to survive page transitions: use `is:inline` and listen for `astro:after-swap`
