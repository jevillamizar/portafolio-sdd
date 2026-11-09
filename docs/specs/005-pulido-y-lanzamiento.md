# Spec 005 — Pulido y lanzamiento

## Historia de usuario
Como dueño del portafolio, quiero que el sitio se vea bien al compartirlo y cargue rápido,
para enviarlo con confianza a reclutadores.

## Criterios de aceptación
- [ ] Favicon propio y logotipo coherente.
- [ ] Etiquetas Open Graph y Twitter globales en `index.html` con imagen de 1200×630 en `public/og.png`
      (son las mismas en todas las rutas; ver ADR-002).
- [ ] `sitemap.xml` generado al compilar con todas las rutas (incluidos los 7 detalles) y `public/robots.txt`.
- [ ] Cabeceras de seguridad en `firebase.json`: `Content-Security-Policy`, `X-Content-Type-Options`,
      `Referrer-Policy` y `Permissions-Policy`, sin romper Google Fonts.
- [ ] Lighthouse ≥ 90 en las 4 categorías en Inicio, Trabajo, un detalle y Hoja de vida.
- [ ] Revisión de todos los textos contra la hoja de vida: ninguna cifra, fecha o tecnología inventada y ningún `TODO`.
- [ ] (Opcional) Dominio propio conectado en Firebase Hosting.

## Tareas técnicas
1. Etiquetas Open Graph/Twitter en `index.html` e imagen OG.
2. Test (Vitest) del generador de sitemap; luego generarlo en `plugins/content.ts` (hook de build) y agregar `public/robots.txt`.
3. Favicon.
4. Cabeceras de seguridad en `firebase.json` y verificación en la vista previa del PR.
5. Ejecutar Lighthouse y corregir hallazgos.
6. Revisión adversarial final de contenido.

## Definición de terminado
Sitio listo para compartir: enlace en LinkedIn y en la hoja de vida.
