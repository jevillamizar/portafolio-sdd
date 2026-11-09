# Diseño

Referencia visual: `docs/referencia/inicio.png` y `docs/referencia/trabajo-cards.png`.
Se toma la **estructura y la sobriedad** de esa referencia, no su marca: el logotipo,
el nombre y los textos son propios.

## Tokens (CSS custom properties en `src/styles/tokens.css`)
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F6F5FC` | Fondo de página (lavanda muy claro) |
| `--surface` | `#FFFFFF` | Cuerpo de las cards, bloques |
| `--surface-2` | `#EFEDF8` | Franja superior de las cards (zona del logo) |
| `--fg` | `#2B2A33` | Texto principal |
| `--muted` | `#6B6880` | Párrafos, subtítulos, eyebrows |
| `--accent` | `#4F35E1` | Logotipo, enlaces, parte destacada del título |
| `--accent-soft` | `#B9AEF5` | Barra "/" del título de página |
| `--line` | `#E3E0F0` | Bordes y separadores |

Tipografía (Google Fonts): **Manrope** para todo el sitio.
- H1 del Inicio: peso 300, `clamp(1.75rem, 3.2vw, 2.5rem)`.
- Títulos de página ("/trabajo."): peso 700.
- Cuerpo: 15–16px, peso 400, color `--muted`, interlineado 1.7.
- Eyebrow: mayúsculas, 14px, `letter-spacing: 0.14em`, color `--muted`.

Contenedor: `max-width: 1180px`, margen lateral mínimo de 16px (24px desde 768px).

## Navbar (todas las páginas)
- Izquierda: logotipo de texto `esteban` en `--accent`, peso 800.
- Derecha en escritorio: `Trabajo` · `Hoja de vida` · `Contacto` (este último lleva a `/#contacto`).
- En móvil (< 768px): ícono de menú de dos líneas (la segunda más corta) que despliega los mismos enlaces.
- Sin fondo ni sombra; solo espacio.

## Footer (todas las páginas)
Una línea: `© 2026 Jaime Esteban Villamizar Rojas` a la izquierda, y a la derecha
`GitHub · LinkedIn · Correo`. Borde superior `--line`.

## Inicio (`/`) — ver `inicio.png`
1. Eyebrow: `HOLA, SOY ESTEBAN`.
2. H1 en dos tonos: `Desarrollador Full Stack` en `--fg` + `que construye plataformas seguras, escalables y con IA aplicada.` en `--accent`.
3. 3–4 párrafos de bio (texto en `src/data/hoja-de-vida.json` → `home`).
4. Botones: `Ver mi trabajo` (primario) y `Hoja de vida` (secundario).
5. **Sección Contacto** (`id="contacto"`) al final: título `¿Trabajamos juntos?`, una línea,
   correo con botón Copiar (y `mailto:`), LinkedIn y GitHub.
Alineación a la izquierda, mucho aire vertical (≥ 96px entre bloques en escritorio).

## Trabajo (`/trabajo`) — ver `trabajo-cards.png`
- Encabezado centrado: `/trabajo.` con la `/` en `--accent-soft`, y debajo
  `Proyectos y trabajos en los que he participado.`
- Rejilla de cards: 3 columnas ≥ 1024px, 2 ≥ 640px, 1 en móvil. `gap: 16px`.
- Card (toda clicable, lleva al detalle):
  - Mitad superior (≈ 170px) en `--surface-2` con el logo centrado. Sin logo: monograma
    de 2 letras del título en `--accent`.
  - Mitad inferior en `--surface`, padding 24px: título en negrita 14px, organización en
    `--accent` 14px, y una línea con etiqueta de tipo + año en `--muted` 12px.
  - Hover: sube 2px y gana una sombra suave. Foco visible igual que hover.
- Orden: campo `order` ascendente.

## Detalle (`/trabajo/[slug]`)
1. Enlace `← Volver a trabajo`.
2. Eyebrow: `TIPO · PERIODO`.
3. H1 con el título; párrafo `summary`.
4. Ficha en rejilla de 2 columnas: Rol · Organización · Periodo · Estado · Stack (chips).
5. Cuerpo Markdown del trabajo (secciones `##`). Tablas con scroll horizontal propio.
6. Enlaces externos si existen.
7. Navegación `← Anterior` / `Siguiente →` según `order`.
8. Bloque final: `¿Te interesa algo parecido?` + enlace a `/#contacto`.
Ancho de lectura: `max-width: 72ch` para el texto.

## Hoja de vida (`/hoja-de-vida`)
Encabezado: nombre, título, ubicación y enlaces (correo, LinkedIn, GitHub).
Secciones en este orden: Perfil · Experiencia · Proyectos · Habilidades · Formación ·
Certificaciones · Idiomas.
- Experiencia: cada cargo con periodo a la izquierda (columna fija de 180px en escritorio)
  y cargo, empresa, modalidad y viñetas a la derecha.
- Proyectos: nombre + una línea + enlace a su detalle en `/trabajo/[slug]`.
- Habilidades: filas por categoría con chips.
- Hoja de estilos de impresión: sin navbar ni footer, blanco y negro, para que
  "Imprimir → Guardar como PDF" produzca un CV limpio.
