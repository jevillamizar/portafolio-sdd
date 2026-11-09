# ADR-001: Astro estático en GitHub Pages

**Estado:** reemplazado por [ADR-002](002-spa-react-vite-firebase-hosting.md) · **Fecha:** 2026-11-08

## Contexto
Sitio de tres páginas con detalle por proyecto, contenido que cambia poco,
un solo desarrollador y meta de publicar pronto sin costo.

## Decisión
Astro generando HTML estático, colecciones de contenido en Markdown validadas con zod,
y despliegue en GitHub Pages con GitHub Actions.

## Alternativas descartadas
- **SPA en React + Vite:** GitHub Pages no resuelve rutas de SPA (`/trabajo/x` da 404 al recargar)
  y envía JavaScript innecesario para un sitio de lectura.
- **Next.js:** más complejo de lo que el sitio necesita; su mejor despliegue es Vercel.
- **Vercel o Netlify:** válidos y gratuitos; se descartan por ahora para no sumar otra cuenta.
  Si más adelante se quieren previews por pull request, migrar es trivial.

## Consecuencias
- Cero JavaScript por defecto; Lighthouse alto sin esfuerzo extra.
- Agregar un proyecto = agregar un archivo Markdown.
- Un formulario de contacto real requeriría un servicio externo; por ahora se usa correo directo.
