# Portafolio de Esteban Villamizar — reglas del agente

SPA de portafolio profesional con tres páginas: Inicio (con Contacto al final),
Trabajo (cards + vista de detalle por trabajo) y Hoja de vida.

- Stack: React + TypeScript + Vite + React Router, CSS propio (sin framework de UI). Ver `docs/adr/002-…`.
- Despliegue: Firebase Hosting (sitio propio dentro del proyecto de Firebase de las clínicas)
  con GitHub Actions. Repositorio `jevillamizar/portafolio-sdd`, rama `main`.

## Regla de oro
No escribas código sin un spec aprobado en `docs/specs/`.
Una tarea a la vez. Al terminar cada tarea muestra cambios y tests, y espera mi OK.
Si algo se sale del alcance del spec, detente y repórtalo.

## Orden de lectura antes de cualquier tarea
1. `docs/base-standards.md`
2. `docs/design.md` (y las imágenes de `docs/referencia/`)
3. `docs/content-model.md`
4. El spec activo en `docs/specs/`

## Comandos
`/enriquecer` · `/spec` · `/implementar` · `/verificar` · `/adversarial` · `/cerrar`

## Contenido
El contenido real vive en `src/content/trabajos/` y `src/data/hoja-de-vida.json`.
Nunca inventes proyectos, cifras, fechas, empresas ni tecnologías.
Si falta un dato, deja `TODO:` en el archivo y pregúntame.

## Seguridad del despliegue
El proyecto de Firebase es compartido con un SaaS en producción. Nunca ejecutes `firebase deploy`
sin `--only hosting:portafolio`, nunca toques otros sitios, reglas, funciones ni Cloud Run del proyecto.

## Idioma
Textos del sitio, docs, specs y commits en español.
Identificadores de código (componentes, variables, archivos .tsx/.ts) en inglés.
