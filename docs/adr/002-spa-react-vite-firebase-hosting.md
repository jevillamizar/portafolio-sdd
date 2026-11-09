# ADR-002: SPA con React + Vite + React Router en Firebase Hosting

**Estado:** aceptado · **Fecha:** 2026-11-08 (hosting confirmado el 2026-11-09) · **Reemplaza a:** ADR-001

> Se evaluó Vercel y se confirmó Firebase Hosting. El sitio tendrá dominio propio, distinto del dominio del SaaS.

## Contexto
El portafolio también es una muestra técnica: el dueño quiere que esté construido con React,
no con HTML estático generado por Astro. Además quiere publicarlo en el mismo proyecto de Firebase
donde ya vive el SaaS de gestión de clínicas, en lugar de GitHub Pages.

## Decisión
- **SPA** con React + TypeScript, empaquetada con **Vite** y enrutada con **React Router** (modo datos,
  `createBrowserRouter`, rutas cargadas con `lazy`).
- **Contenido en Markdown y JSON, procesado al compilar** por un plugin de Vite propio
  (`plugins/content.ts`): lee el frontmatter, lo valida con **zod**, convierte el Markdown a HTML y lo
  expone como módulo. Un dato inválido rompe `vite build`, y el navegador no descarga ningún parser.
- **Firebase Hosting** como un **sitio adicional** dentro del proyecto de Firebase de las clínicas
  (multi-site). Con `rewrites` hacia `/index.html`, todas las rutas de la SPA responden al recargar.
- Despliegue con GitHub Actions usando la acción oficial de Firebase Hosting: merge a `main` → producción;
  pull request → canal de vista previa.

## Alternativas descartadas
- **Astro + islas React (ADR-001 ampliado):** mejor SEO y menos JavaScript, pero el dueño prefiere
  una SPA en React de punta a punta.
- **React Router en modo framework con prerender:** resolvería el SEO por página, pero suma un modelo
  de rutas y de build más complejo. Se puede retomar si el SEO social lo exige.
- **GitHub Pages:** no resuelve rutas de SPA sin trucos (`404.html` que redirige).
- **Proyecto de Firebase nuevo:** más aislado, pero el dueño quiere reutilizar el proyecto existente.

## Consecuencias
- **Sin JavaScript no hay sitio.** Se muestra un `<noscript>` con correo, LinkedIn y GitHub.
- **SEO.** Google ejecuta JavaScript, así que `title` y `description` por ruta funcionan (se renderizan con los
  elementos `<title>` y `<meta>` nativos de React 19). Los rastreadores de redes sociales **no** ejecutan JS:
  las etiquetas Open Graph son las mismas para todo el sitio (las de `index.html`).
- **404 suave.** Una ruta inexistente muestra la página 404 de la app, pero el servidor responde 200.
- **Accesibilidad en navegación cliente.** Al cambiar de ruta hay que mover el foco y desplazar el scroll
  manualmente (lo haría el navegador en un sitio de varias páginas).
- **Riesgo por compartir proyecto con un SaaS en producción.** El secreto de GitHub será una cuenta de
  servicio dedicada con el único rol *Firebase Hosting Admin*, nunca la que despliega el SaaS.
  Un `target` en `.firebaserc` limita cada despliegue al sitio del portafolio.
- Agregar un proyecto sigue siendo agregar un archivo Markdown.
