# Spec 003 — Vista de detalle de cada trabajo

## Historia de usuario
Como reclutador técnico, quiero abrir un trabajo y ver el problema, lo que Esteban construyó,
sus decisiones y resultados, para evaluar su nivel real.

## Criterios de aceptación
- [ ] Ruta `/trabajo/:slug` en React Router; un slug inexistente muestra la página 404.
- [ ] Estructura según la sección Detalle de `docs/design.md`: volver, eyebrow, H1, resumen, ficha, cuerpo Markdown,
      enlaces, anterior/siguiente y bloque de contacto.
- [ ] La ficha muestra Rol, Organización, Periodo, Estado (etiqueta legible) y Stack como chips.
- [ ] El cuerpo (HTML generado al compilar) se ve bien: títulos `##`, listas, negritas y tablas con scroll
      horizontal propio en móvil.
- [ ] Anterior/Siguiente siguen el `order`; el primero no tiene Anterior y el último no tiene Siguiente.
- [ ] `title` = `<título> · Esteban Villamizar`; description = `summary`, recortada a 160 caracteres en una palabra completa.
- [ ] Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.

## Tareas técnicas
1. Test (Vitest): `getNeighbors(sortedList, slug)` devuelve `{ prev, next }` correctos en los extremos;
   `getWorkBySlug()` devuelve `undefined` para un slug inexistente; `truncateDescription()` corta en palabra.
2. Implementar esas funciones en `src/lib/work.ts`.
3. `src/components/WorkMeta.tsx` y `src/components/WorkNav.tsx` (test de Testing Library: extremos sin enlace).
4. `src/pages/WorkDetailPage.tsx` (lee `:slug` con `useParams`; el HTML del cuerpo se inserta con
   `dangerouslySetInnerHTML` porque se genera en el build a partir de contenido propio).
5. Estilos de prosa en `src/styles/prose.css` (ancho 72ch, tablas, listas).
6. Test e2e: cada card abre su detalle; el detalle tiene un `h1`, la ficha y al menos una sección `h2`;
   `/trabajo/no-existe` muestra la 404.

## Casos borde
- Trabajo sin `links` → la sección de enlaces no se muestra.
- Tabla ancha (resultados de la tesis) en 390px → scroll dentro de la tabla, la página no se desplaza de lado.
- Recargar el navegador estando en un detalle → carga directo (rewrites de Firebase).

## Definición de terminado
Los 7 detalles publicados y navegables desde las cards.
