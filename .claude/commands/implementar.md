---
description: Implementa UNA tarea de un spec con TDD y se detiene.
---
Lee `CLAUDE.md`, `docs/base-standards.md`, `docs/design.md` y el spec indicado.

Tarea a implementar: $ARGUMENTS

Reglas:
- Solo esa tarea. No adelantes la siguiente.
- Si la tarea tiene lógica: primero el test en rojo, luego la implementación mínima, luego el test en verde.
- Si es maquetación: implementa y agrega o actualiza el test e2e que verifica su criterio.
- Usa solo contenido de `src/content/` y `src/data/`. Nada inventado.
- Si necesitas tocar algo fuera del alcance del spec, detente y dime qué y por qué.

Al terminar muestra:
- Archivos creados o modificados
- Resultado de `npm run check` y de los tests
- Pregunta: "¿Continúo con la tarea N+1?"
