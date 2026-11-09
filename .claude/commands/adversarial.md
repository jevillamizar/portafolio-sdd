---
description: Revisión crítica independiente antes del commit.
---
Actúa como un revisor crítico que no escribió este código. Revisa el cambio del spec: $ARGUMENTS

Busca en especial:
- Contenido inventado o que no coincide con `src/data/hoja-de-vida.json` (cifras, fechas, tecnologías)
- Accesibilidad: un solo h1, foco visible, contraste, aria del menú, alt de imágenes
- Responsive: desbordes horizontales en 390px
- Enlaces internos rotos y enlaces externos sin `rel="noopener"`
- SEO: title y description por página
- Código frágil, duplicado o textos escritos dentro de componentes

Entrega una tabla: # | Severidad (Alta/Media/Baja) | Problema | Archivo | Esfuerzo del fix.
No corrijas nada todavía.
