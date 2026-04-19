# Mi Portafolio Dev — David E. Sánchez Román

Portafolio profesional enfocado en **Análisis de Datos** y **Desarrollo de Software**. Construido con Astro 5, React 19, Tailwind CSS 3, desplegado en Netlify con backend en Supabase.

🌐 **Live:** [mi-portafolio-dev.netlify.app](https://mi-portafolio-dev.netlify.app)

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 5.x (SSR) |
| UI Interactiva | React 19 |
| Estilos | Tailwind CSS 3 (dark mode) |
| Gráficos | Chart.js + react-chartjs-2 |
| Base de Datos | Supabase (PostgreSQL) |
| Hosting | Netlify (SSR adapter) |
| Functions | Netlify Serverless |

## Secciones

- **Inicio** — Hero, habilidades clave
- **Sobre Mí** — Trayectoria profesional y transición a análisis de datos
- **Proyectos** — Dashboard analítico, Power BI, gestor de tareas full-stack
- **Dashboard** — Visualización de datos en tiempo real (Supabase → Chart.js)
- **Contacto** — Formulario vía Netlify Forms

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (localhost:4321)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Variables de Entorno

Crear un archivo `.env.local` con:

```
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_anon_key
```

## Estructura del Proyecto

```
src/
├── components/     # Header, Footer, DashboardClient, Charts
├── data/           # Datos estáticos (fallback)
├── db/             # Cliente de Supabase
├── layouts/        # BaseLayout, DashboardLayout, ProjectsLayout
├── pages/          # index, sobre-mi, proyectos, contacto, dashboard
└── styles/         # Tailwind directives
```

## Autor

**David E. Sánchez Román**
- 📍 Santiago, Chile
- 🎓 CIISA — Ingeniería en Informática
- 🔗 [GitHub](https://github.com/davidsanchezroman) · [LinkedIn](https://linkedin.com/in/david-sanchez-roman-817022320)
- 📧 dsanchezroman9@gmail.com
