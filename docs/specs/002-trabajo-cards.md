# Spec 002 — Página Trabajo con cards

## Historia de usuario
Como visitante, quiero ver todos los trabajos de Esteban en una rejilla clara,
para elegir cuál abrir en detalle.

## Criterios de aceptación
- [ ] `plugins/content.ts` procesa `src/content/trabajos/*.md` al compilar y expone `virtual:trabajos`
      según `docs/content-model.md`; un frontmatter inválido, un `logo` inexistente o un `order` repetido
      rompen el build con un mensaje que nombra el archivo.
- [ ] Encabezado `/trabajo.` y subtítulo según `docs/design.md`.
- [ ] Rejilla de 3/2/1 columnas con una card por archivo de `src/content/trabajos/`.
- [ ] Card: zona de logo (o monograma), título, organización y línea `Etiqueta de tipo · año`.
      Toda la card es un solo `Link` a `/trabajo/<slug>`.
- [ ] Orden por `order` ascendente.
- [ ] Hover y foco con la misma elevación; contraste AA.

## Tareas técnicas
1. Tests (Vitest) para `src/lib/work.ts`: `sortWork()` ordena por `order`; `typeLabel()` y `statusLabel()`
   devuelven las etiquetas de `content-model.md`; `monogram()` toma la inicial de las dos primeras palabras
   significativas, ignorando artículos y preposiciones (`'Plataforma de clínicas'` → `PC`,
   `'TEIOT: plataforma…'` → `TP`).
2. Implementar `src/lib/work.ts`.
3. Tests (Vitest) para el plugin con archivos de ejemplo en `tests/fixtures/`: frontmatter válido produce
   `{ slug, data, html }`; campo faltante, `type` desconocido, `summary` > 200, `logo` inexistente y `order`
   repetido lanzan error con el nombre del archivo; las tablas quedan envueltas en `.table-scroll`.
4. `src/lib/work-schema.ts` (zod) y `plugins/content.ts` (frontmatter + Markdown → HTML), registrado en
   `vite.config.ts`, con tipos de `virtual:trabajos` en `src/types/virtual.d.ts`.
5. `src/components/WorkCard.tsx`.
6. `src/pages/WorkPage.tsx` con su `PageMeta`.
7. Test e2e: hay tantas cards como archivos; cada card enlaza a una ruta existente.

## Casos borde
- Trabajo sin logo → monograma.
- Título largo → hace salto de línea dentro de la card sin desbordar.
- Número de cards no múltiplo de 3 → la última fila queda alineada a la izquierda.

## Definición de terminado
`/trabajo` publicado con los 7 trabajos.
