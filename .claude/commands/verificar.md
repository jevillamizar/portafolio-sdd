---
description: Verifica la implementación contra los criterios de aceptación del spec.
---
Lee el spec indicado: $ARGUMENTS

Para cada criterio de aceptación responde:
- ✅ Cumplido — con el archivo o test que lo demuestra
- ⚠️ Parcial — qué falta
- ❌ Pendiente — qué hay que hacer

Corre `npm run check`, `npm test`, `npm run build` y `npm run test:e2e` y muestra el resultado.
Revisa visualmente en 390px, 768px y 1280px (Playwright con capturas) y reporta problemas.
No modifiques código.
