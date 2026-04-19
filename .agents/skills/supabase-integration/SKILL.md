---
name: supabase-integration
description: Supabase database connection, data fetching patterns, and serverless function integration
---

# Supabase Integration Skill

## When to Use
Activate this skill when working with database queries, data fetching, creating new data-driven pages, or modifying the Supabase integration.

## Architecture Overview

```
Browser → Astro Page (SSR) → supabase.js client → Supabase PostgreSQL
                                                         ↑
Browser → Netlify Function → supabase client (CommonJS) ──┘
```

Two data paths exist:
1. **SSR (preferred):** Astro pages fetch data server-side in the frontmatter using `src/db/supabase.js`
2. **Serverless Functions:** `netlify/functions/` for API endpoints accessible from client-side JS

## Client Configuration

**File:** `src/db/supabase.js` (⚠️ DO NOT modify without approval)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## Environment Variables

| Variable | Location | Format |
|----------|----------|--------|
| `SUPABASE_URL` | `.env` / `.env.local` | `https://xxxxx.supabase.co` |
| `SUPABASE_KEY` | `.env` / `.env.local` | Anon/public key |
| `SUPABASE_ANON_KEY` | Netlify env | Same as SUPABASE_KEY (for functions) |

> **Important:** `.env` and `.env.local` are in `.gitignore`. Never commit or log these values.

## Data Fetching Pattern (SSR — Astro Frontmatter)

```astro
---
import { supabase } from '../db/supabase';

const { data, error } = await supabase
    .from('table_name')
    .select('*');

if (error) {
    console.error('Error fetching data:', error);
}
---

{error ? (
    <div class="text-red-500 text-center py-10">
        <p>Error loading data: {error.message}</p>
    </div>
) : !data || data.length === 0 ? (
    <div class="text-white text-center py-10">
        <p>No data available.</p>
    </div>
) : (
    <!-- Render data here -->
)}
```

## Existing Tables

| Table | Columns (known) | Used By |
|-------|-----------------|---------|
| `sales_data` | date, sales, units, category, seller, product | `dashboard.astro`, `DashboardClient.jsx` |

## Serverless Function Pattern

**Location:** `netlify/functions/<function-name>.js`

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.handler = async (event, context) => {
    try {
        const { data, error } = await supabase
            .from('table_name')
            .select('*');

        if (error) {
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ message: error.message }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: e.message }),
        };
    }
};
```

## Data Processing Pattern (for Charts)

When processing data for Chart.js visualizations:

```javascript
const dataByGroup = {};
for (const item of rawData) {
    const key = item.fieldName || 'Unknown';
    const value = item.numericField || 0;
    dataByGroup[key] = (dataByGroup[key] || 0) + value;
}

const labels = Object.keys(dataByGroup).sort();
const values = labels.map(k => dataByGroup[k]);

// Pass to chart component:
// { labels, data: values }
```

## Adding a New Data Source

1. Create the table in Supabase Dashboard
2. Add Row Level Security (RLS) policy if needed
3. Fetch data in Astro frontmatter using the existing `supabase` client
4. Process data server-side before passing to React components
5. Pass processed data as props to client components (minimizes client bundle)

## Rules

1. **Prefer SSR fetching** over client-side fetching — data loads faster and stays secure
2. **Process data server-side** in Astro frontmatter, pass clean props to React
3. **Always handle errors** — show user-friendly error messages, never raw errors
4. **Always handle empty states** — show meaningful "no data" messages
5. **Use CommonJS** (`require`) in Netlify functions, **ESM** (`import`) in Astro/React
6. **CORS headers** are required in all serverless function responses
