# Spec 001 — Página de Inicio con Contacto

## Historia de usuario
Como reclutador o cliente que llega al sitio, quiero entender en segundos quién es Esteban
y cómo contactarlo, para decidir si sigo explorando su trabajo.

## Criterios de aceptación
- [ ] Estructura y estilo según la sección Inicio de `docs/design.md` y `docs/referencia/inicio.png`.
- [ ] Eyebrow, H1 en dos tonos y párrafos salen de `hoja-de-vida.json → home`; ningún texto queda escrito en el componente.
- [ ] Botones `Ver mi trabajo` (→ `/trabajo`) y `Hoja de vida` (→ `/hoja-de-vida`), con `Link` de React Router.
- [ ] Sección `#contacto` al final con correo, LinkedIn y GitHub. El correo es texto seleccionable, enlace `mailto:` y botón Copiar.
- [ ] El botón Copiar usa `navigator.clipboard`; si falla, selecciona el texto. Muestra "Copiado" durante 2 s y lo anuncia con `aria-live`.
- [ ] El enlace `Contacto` de la navbar lleva a `#contacto` desde cualquier ruta (también si ya estás en Inicio).
- [ ] `title`: `Esteban Villamizar · Desarrollador Full Stack`; description de ≤ 160 caracteres.

## Tareas técnicas
1. Test (Vitest): `home` en el JSON valida y tiene eyebrow, título y ≥ 2 párrafos. Luego ampliar
   `src/data/resume.ts` con `homeSchema` y `getHome()`.
2. Test (Testing Library) del botón Copiar: éxito → "Copiado" y vuelve tras 2 s; `clipboard` rechazado →
   texto seleccionado y "Selecciona y copia". Luego `src/components/CopyEmailButton.tsx`.
3. `src/components/Hero.tsx` (props tipadas desde `home`).
4. `src/components/ContactSection.tsx`.
5. Ensamblar `src/pages/HomePage.tsx` con su `PageMeta`.
6. Test e2e: H1 visible, botones navegan, `#contacto` existe con los 3 canales, clic en `Contacto` desde
   `/trabajo` termina con `#contacto` en pantalla, Copiar cambia su texto.

## Casos borde
- Portapapeles bloqueado → el texto queda seleccionado y el botón dice "Selecciona y copia".
- Clic en `Contacto` estando ya en `/#contacto` → vuelve a desplazar hasta la sección.
- Pantalla de 390px → botones apilados, sin scroll horizontal.

## Definición de terminado
Inicio publicado y verificado en 390, 768 y 1280px.
