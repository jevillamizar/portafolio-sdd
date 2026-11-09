# Spec 004 — Página Hoja de vida

## Historia de usuario
Como reclutador, quiero leer la hoja de vida completa y bien organizada en la web
y poder guardarla en PDF, para compartirla en mi proceso de selección.

## Criterios de aceptación
- [ ] Todo el contenido sale de `src/data/hoja-de-vida.json`, validado con zod en `src/data/resume.ts`
      y también al compilar por `plugins/content.ts`.
- [ ] Secciones en el orden de `docs/design.md`: Perfil, Experiencia, Proyectos, Habilidades, Formación, Certificaciones, Idiomas.
- [ ] Experiencia: periodo, cargo, empresa, modalidad y viñetas; más reciente primero.
- [ ] Cada proyecto enlaza a su detalle en `/trabajo/<slug>` y ese slug existe en `virtual:trabajos`.
- [ ] El estado de cada proyecto coincide con `statusLabel()` del trabajo enlazado.
- [ ] Hoja de estilos `@media print`: sin navbar, footer ni botones; blanco y negro; sin cortes dentro de un cargo.
- [ ] Botón `Descargar PDF` si existe `public/cv-esteban-villamizar.pdf`; si no existe, el botón no aparece
      (el plugin expone esa bandera al compilar).

## Tareas técnicas
1. Test (Vitest): el JSON valida; la experiencia queda ordenada por fecha de inicio descendente; cada
   `projects[].slug` existe entre los trabajos; un valor con `TODO:` hace fallar la validación.
2. Completar el esquema en `src/data/resume.ts` y la validación de la hoja de vida y la bandera del PDF en `plugins/content.ts`.
3. Componentes `ResumeSection.tsx`, `ExperienceItem.tsx`, `SkillRow.tsx`.
4. `src/pages/ResumePage.tsx` con su `PageMeta`.
5. `src/styles/print.css`.
6. Test e2e: las 7 secciones existen y los enlaces de proyectos llevan a rutas válidas.

## Casos borde
- Campo con `TODO:` en el JSON → el build falla con un mensaje claro (no se publica un TODO).

## Definición de terminado
`/hoja-de-vida` publicada y la vista previa de impresión da un CV limpio de 2 páginas o menos.
