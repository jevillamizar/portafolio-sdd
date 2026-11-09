# Kit SDD · Portafolio de Esteban Villamizar

Todo lo necesario para construir y publicar el portafolio con Claude Code bajo SDD:
reglas, diseño, specs, comandos y el contenido real ya redactado.

## Qué trae

| Ruta | Contenido |
|---|---|
| `CLAUDE.md` | Reglas del agente (se carga sola en Claude Code) |
| `PROMPT-INICIO.md` | Prompt para la primera sesión y flujo por spec |
| `docs/base-standards.md` | Estándares: simplicidad, pruebas, accesibilidad, rendimiento, git |
| `docs/design.md` | Tokens, tipografía y estructura de cada página y componente |
| `docs/content-model.md` | Esquema de los trabajos y de la hoja de vida |
| `docs/deploy.md` | Despliegue en Firebase Hosting |
| `docs/adr/001-…` | (Reemplazado) Astro estático en GitHub Pages |
| `docs/adr/002-…` | Por qué SPA React + Vite en Firebase Hosting |
| `docs/specs/000…005` | Base y despliegue · Inicio · Trabajo · Detalle · Hoja de vida · Pulido |
| `docs/referencia/` | Las dos capturas de estilo |
| `.claude/commands/` | `/enriquecer` `/spec` `/implementar` `/verificar` `/adversarial` `/cerrar` |
| `src/content/trabajos/` | Los 7 trabajos con su caso completo |
| `src/data/hoja-de-vida.json` | Hoja de vida estructurada |

## Puesta en marcha

1. El repositorio ya existe: `jevillamizar/portafolio-sdd`, rama `main`.
2. Sigue los **pasos únicos** de `docs/deploy.md` (sitio de Firebase, cuenta de servicio y secreto en GitHub).
3. El proyecto Vite + React lo crea Claude Code en la tarea 1 del spec 000.

## Antes de publicar, resuelve estos datos

- [ ] **PSNR de la tesis.** Las conclusiones dicen "PSNR superior a 35 dB en todos los casos" y la Tabla X
      muestra 29–32 dB a 30.000 iteraciones. El contenido usa la Tabla X; confirma cuál es la correcta.
- [ ] **Hoja de vida original.** Las viñetas de Hops Group repiten las de GPSTalent. Aquí quedaron solo las propias
      de cada empresa; corrige también tu CV en Word.
- [ ] **Teléfono.** `+57 314600947` tiene un dígito de menos. El sitio no publica teléfono; corrígelo en el CV.
- [ ] **Enlaces.** Agrega en el frontmatter (`links`) la URL del Museo Virtual, el repositorio de TEIOT y el PDF de la
      tesis si son públicos.
- [ ] **Logos y capturas.** Si tienes logos o capturas de cada proyecto, ponlos en `src/assets/trabajos/` y
      pon el nombre del archivo en `logo`. Sin logo la card muestra un monograma.
- [ ] **CV en PDF.** Guárdalo como `public/cv-esteban-villamizar.pdf` para activar el botón de descarga.
