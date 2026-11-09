# Spec 000 — Base del sitio y despliegue

## Historia de usuario
Como dueño del portafolio, quiero el esqueleto de la SPA publicado en internet desde el primer día,
para que cada página nueva salga a producción apenas esté lista.

## Alcance
Entra: proyecto Vite + React + TypeScript, enrutador, layout base, tokens, fuente, navbar, footer,
tres páginas vacías, página 404, esquema mínimo de `person`, herramientas de prueba,
configuración de Firebase Hosting y workflow de despliegue.
No entra: contenido real de las páginas (specs 001–004), plugin de contenido (spec 002), SEO social (spec 005).

## Criterios de aceptación
- [ ] `npm run dev`, `npm run build`, `npm run check`, `npm test` y `npm run test:e2e` funcionan sin errores.
- [ ] Existen las rutas `/`, `/trabajo`, `/hoja-de-vida` y una ruta comodín 404, todas con el mismo layout.
- [ ] Recargar el navegador en `/trabajo` o `/hoja-de-vida` en producción no da 404 de Firebase (rewrites).
- [ ] Navbar: logotipo `esteban` que lleva a `/`; enlaces Trabajo, Hoja de vida y Contacto (`/#contacto`).
- [ ] En < 768px los enlaces se ocultan tras un botón de menú con `aria-expanded` y `aria-controls`;
      funciona con teclado, se cierra con Escape y al navegar.
- [ ] El enlace de la ruta actual tiene `aria-current="page"`.
- [ ] Footer con © 2026, nombre completo y enlaces a GitHub, LinkedIn y correo, leídos de `hoja-de-vida.json → person`.
- [ ] Enlace "Saltar al contenido" como primer elemento enfocable.
- [ ] Al cambiar de ruta: scroll arriba (o al `#ancla` si existe), foco en el `h1` y `title` actualizado.
- [ ] Cada ruta define su `title` y `meta description`.
- [ ] Un push a `main` publica en el sitio de Firebase del portafolio; un PR genera una vista previa.

## Tareas técnicas (en orden)
1. **Configuración.** Proyecto Vite con plantilla `react-ts` en la raíz, sin pisar los archivos del kit.
   `tsconfig` strict; scripts `dev`, `build` (`tsc -b && vite build`), `preview`, `check` (`tsc -b --noEmit`),
   `test` (Vitest, jsdom) y `test:e2e` (Playwright contra `vite preview`). Configuración de Vitest con
   Testing Library. `.gitignore` con `dist/`, `node_modules/`, `test-results/`, `playwright-report/`, `.firebase/`.
   Borrar los archivos de ejemplo de la plantilla.
2. **Esquema de `person`.** Test (Vitest) primero: `hoja-de-vida.json` valida contra `personSchema` y un
   `person` sin `email` falla. Luego `src/data/resume.ts` con `personSchema` y `getPerson()`.
3. **Estilos base.** `src/styles/tokens.css` con los tokens de `docs/design.md`; `src/styles/global.css`
   (reset, Manrope desde Google Fonts en `index.html` con `preconnect` y `display=swap`, fallback de sistema,
   contenedor, foco visible, clase `.visually-hidden`). `index.html` con `lang="es"` y `<noscript>` con los
   tres canales de contacto.
4. **Enrutador y layout.** `src/router.tsx` con `createBrowserRouter` y rutas `lazy`; `src/components/Layout.tsx`
   (skip link, `Navbar`, `<main id="main">` con `<Outlet />`, `Footer`); `src/components/RouteEffects.tsx`
   (scroll, foco en `h1`, ancla); `src/components/PageMeta.tsx` (`<title>` y `<meta name="description">`).
   Tests de Testing Library: al navegar, el foco queda en el `h1` y el `title` cambia.
5. **Navbar.** `src/components/Navbar.tsx` con `NavLink` (`aria-current`) y menú móvil.
   Tests: abre y cierra con clic y teclado, Escape lo cierra y devuelve el foco al botón, navegar lo cierra.
6. **Footer.** `src/components/Footer.tsx` leyendo `getPerson()`. Enlaces externos con `rel="noopener noreferrer"`.
7. **Páginas vacías.** `src/pages/HomePage.tsx`, `WorkPage.tsx`, `ResumePage.tsx`, `NotFoundPage.tsx`,
   cada una con su `h1` provisional y `PageMeta`. La 404 enlaza a Inicio.
8. **Pruebas e2e.** `tests/e2e/smoke.spec.ts`: las 4 rutas responden al cargar directo, hay un solo `h1`,
   la navbar enlaza a las rutas correctas (incluido `/#contacto`, sin exigir que exista el ancla todavía),
   el menú móvil abre y cierra en 390px, no hay scroll horizontal en 390px.
> **Tareas 9 y 10:** hosting confirmado (Firebase). Requieren el nombre del sitio creado en
> `docs/deploy.md` paso 2. El dominio propio no las bloquea (paso 6, después).

9. **Firebase.** `firebase.json` y `.firebaserc` según `docs/deploy.md` (target `portafolio`).
10. **Despliegue.** `.github/workflows/deploy.yml` según `docs/deploy.md`: instala, `check`, `test`, `build`,
    `test:e2e` (solo Chromium) y publica (`live` en `main`, vista previa en PR).

## Casos borde
- Ruta inexistente → `NotFoundPage` con enlace a Inicio (el servidor responde 200; ver ADR-002).
- JavaScript desactivado → `<noscript>` con correo, LinkedIn y GitHub.
- `/#contacto` antes de que exista la sección (spec 001) → carga Inicio arriba, sin error.
- Menú móvil abierto y la ventana pasa a ≥ 768px → los enlaces quedan visibles y el estado no estorba.

## Definición de terminado
Sitio publicado en Firebase con las 4 rutas, pruebas en verde en Actions y PR `spec/000-base` mergeado
con el mensaje `feat: base del sitio y despliegue`.
