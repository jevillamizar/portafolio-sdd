# Modelo de contenido

## Cómo llega el contenido a la app
`plugins/content.ts` es un plugin de Vite que, **al compilar**:
1. Lee `src/content/trabajos/*.md`, separa frontmatter y cuerpo.
2. Valida el frontmatter con el esquema zod de `src/lib/work-schema.ts`.
3. Convierte el cuerpo a HTML (Markdown con tablas GFM) y envuelve cada tabla en un contenedor con scroll.
4. Expone el resultado como el módulo virtual `virtual:trabajos`.

Si un archivo no valida, `vite build` (y `vite dev`) fallan con el nombre del archivo y el campo.
El contenido es propio y se genera en el build, por eso el HTML resultante se considera confiable.

## Colección `trabajos` (`src/content/trabajos/*.md`)
El nombre del archivo es el slug de la URL: `plataforma-clinicas.md` → `/trabajo/plataforma-clinicas`.

```ts
// src/lib/work-schema.ts (spec 002)
type: 'empresa' | 'producto' | 'investigacion' | 'personal'
title: string            // nombre del trabajo
organization: string     // empresa, universidad o "Proyecto propio"
period: string           // "Ene 2025 – Feb 2026"
year: number             // año de inicio, para la etiqueta de la card
role: string
status: 'produccion' | 'en-desarrollo' | 'finalizado'
summary: string          // ≤ 200 caracteres; card, meta description y encabezado del detalle
stack: string[]
logo?: string            // opcional; nombre de archivo en src/assets/trabajos/ (el plugin verifica que exista).
                         // Sin logo la card muestra un monograma
links?: { label: string; url: string }[]
order: number            // orden en la rejilla y en anterior/siguiente; único
```

Lo que recibe la app por cada trabajo: `{ slug, data, html }`.

Etiquetas visibles del tipo:
| type | Etiqueta |
|---|---|
| `empresa` | Empresa |
| `producto` | Producto propio |
| `investigacion` | Investigación |
| `personal` | Proyecto personal |

Etiquetas visibles del estado: `produccion` → En producción · `en-desarrollo` → En desarrollo · `finalizado` → Finalizado.

El cuerpo Markdown usa estas secciones `##` cuando aplican:
`El problema` · `Qué construí` · `Decisiones de ingeniería` · `Resultados` · `Límites y siguientes pasos`.

## Datos de la hoja de vida (`src/data/hoja-de-vida.json`)
Un solo JSON tipado con: `person`, `home`, `profile`, `experience[]`, `projects[]`,
`skills[]`, `education[]`, `certifications[]`, `languages[]`.
El esquema zod vive en `src/data/resume.ts` y crece por specs:
- Spec 000: `person` (lo usan Navbar y Footer).
- Spec 001: `home`.
- Spec 004: el resto, más la regla "ningún valor contiene `TODO:`".

El plugin de contenido también valida este JSON al compilar.
