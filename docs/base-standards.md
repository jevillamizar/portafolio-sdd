# Estándares base (fuente única de verdad)

## Principios
1. **Simple primero.** SPA en React + Vite. Sin librerías de UI, de estado global ni de estilos:
   componentes de función, estado local y CSS propio con custom properties.
2. **Pasos pequeños.** Una tarea del spec a la vez, con commit por tarea en la rama del spec.
3. **Contenido separado del diseño.** Los componentes leen de `src/content/` y `src/data/`
   (a través de `src/lib/`); ningún texto de proyecto va escrito dentro de un componente.
4. **Desplegable siempre.** `main` siempre compila y se publica. Cada spec termina en producción.
5. **Nada de contenido en tiempo de ejecución que pueda resolverse al compilar.** Markdown y frontmatter
   se procesan en el build (`plugins/content.ts`); el navegador recibe datos ya validados.

## Calidad
- TypeScript en modo `strict`. Sin `any`.
- Contenido validado con `zod` **al compilar**: un frontmatter o un JSON inválido rompe `npm run build`.
- **TDD donde hay lógica:** helpers de orden, filtros, formato de fechas, esquemas de contenido y el plugin
  de contenido se prueban con Vitest antes de implementarse.
- **Componentes con comportamiento** (menú móvil, botón Copiar, navegación anterior/siguiente) se prueban
  con Vitest + Testing Library (jsdom).
- **Maquetación:** cada criterio visual del spec se verifica con un test e2e de Playwright contra
  `vite preview` (la ruta responde, los elementos clave existen, los enlaces internos no están rotos),
  más revisión visual en 3 anchos: 390px, 768px y 1280px.
- No se exige porcentaje de cobertura; se exige que cada criterio de aceptación tenga una prueba
  o una verificación explícita.

## Accesibilidad (obligatorio)
- HTML semántico: `header`, `nav`, `main`, `footer`, un solo `h1` por ruta.
- Enlace "Saltar al contenido".
- Contraste AA, foco visible en enlaces y botones, `alt` en todas las imágenes.
- El menú móvil funciona con teclado, se cierra con Escape y al navegar, y anuncia su estado (`aria-expanded`).
- **Cambio de ruta:** el scroll vuelve arriba (o al `#ancla` si la URL la trae), el foco pasa al `h1`
  de la nueva ruta y el `title` del documento se actualiza.

## Rendimiento y SEO
- Lighthouse ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- Rutas cargadas con `lazy` de React Router (code splitting por página).
- Imágenes importadas desde `src/assets/` (Vite les pone hash), con `width`, `height`, `alt` y `loading="lazy"`
  fuera del primer pantallazo.
- `title` y `meta description` únicos por ruta, con los elementos nativos de React 19.
- Las etiquetas Open Graph son globales (en `index.html`): los rastreadores sociales no ejecutan JS (ADR-002).

## Privacidad
- En el sitio solo aparecen correo, LinkedIn y GitHub. No publicar el teléfono.

## Git
- Conventional commits en español: `feat: página de trabajo con cards`.
- Rama por spec: `spec/001-inicio`. Pull request a `main` = vista previa; merge a `main` = despliegue.
