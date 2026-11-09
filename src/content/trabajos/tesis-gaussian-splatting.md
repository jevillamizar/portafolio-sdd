---
type: investigacion
title: Reconstrucción 3D de objetos arqueológicos con 3D Gaussian Splatting
organization: Universidad del Cauca
period: Mar 2026
year: 2026
role: Investigador (trabajo de grado)
status: finalizado
summary: Evalué algoritmos de 3D Gaussian Splatting, construí un pipeline para digitalizar volantes de huso de la Ceramoteca y publiqué los modelos en un museo virtual web.
stack: [Python, PyTorch, COLMAP, FFmpeg, Google Colab, React, Vite, Three.js, React Three Fiber, Leaflet, Tailwind, MUI, Hugging Face, GitHub Pages]
order: 2
---

## El problema

Las piezas de la Ceramoteca del Museo de Historia Natural de la Universidad del Cauca solo se pueden ver
en persona. Métodos de reconstrucción como NeRF logran gran calidad, pero su entrenamiento es costoso.
La pregunta: ¿puede 3D Gaussian Splatting dar reconstrucciones fieles de piezas pequeñas, con superficies
complejas, en las condiciones de un museo con recursos limitados?

Trabajo de grado en modalidad de investigación (Design Science Research), Programa de Ingeniería
Electrónica y Telecomunicaciones. Director: PhD. Carlos Hernán Tobar Arteaga.

## Qué construí

**Investigación**
- Revisión sistemática de literatura con el método PRISMA y mapeo científico con VOSviewer.
- Caracterización y comparación de métodos derivados de 3DGS (3DGS base, SuGaR, NeuSG, métodos few-shot y monocular)
  con una matriz de evaluación ponderada.
- Desarrollo matemático del renderizado directo y del proceso inverso de 3DGS: jacobianos, covarianzas 3D y 2D
  y armónicos esféricos.

**Pipeline de reconstrucción**
1. Captura fotogramétrica de tres volantes de huso (geometría discoidal, cónica y semicilíndrica).
2. Preprocesamiento con COLMAP: extracción SIFT, matching exhaustivo y bundle adjustment.
3. Entrenamiento con PyTorch sobre el repositorio oficial de 3DGS (30.000 iteraciones).
4. Evaluación dual: métricas numéricas (PSNR, SSIM, L1) y perceptual (LPIPS).

**Museo Virtual de la Cerámica (sitio web)**
SPA en React que lleva la colección a cualquier navegador: modelos 3D con control de órbita, un mapa real de Colombia
con marcadores por zona arqueológica (Calima, Patía, Tierradentro, Popayán, Nariño, Tumaco, Corinto y Quimbaya),
una página por cultura y un recorrido panorámico 360° de la Ceramoteca.

## Decisiones de ingeniería

- **Verificación antes de descargar.** Para modelos grandes, el visor consulta el tamaño real con una petición HEAD
  y pide confirmación si supera unos 100 MB, antes de iniciar la descarga con barra de progreso.
- **Activos pesados fuera del bundle.** Los modelos glTF livianos viajan con el sitio estático; los grandes se resuelven
  contra un bucket de Hugging Face.
- **Sitio 100 % estático.** El proyecto arrancó con Supabase como backend; retiré esa integración en un commit propio,
  dejando funciones que avisan en vez de fallar en silencio.
- **Panorama 360° sin librería extra:** una esfera invertida texturizada en Three.js, con la misma pila de render del resto del sitio.

## Resultados

Métricas por pieza a 30.000 iteraciones (Tabla X del trabajo de grado):

| Volante de huso | PSNR (dB) ↑ | SSIM ↑ | LPIPS ↓ | Entrenamiento |
|---|---|---|---|---|
| 1 · Discoidal | 31,96 | 0,9430 | 0,2716 | 1 h 14 min |
| 2 · Cónico | 29,02 | 0,8995 | 0,1916 | 1 h 37 min |
| 3 · Semicilíndrico | 30,37 | 0,9387 | 0,2452 | 1 h 10 min |

- Con 90 imágenes la nube de puntos creció 48 % (78.540 frente a 53.076 puntos), a cambio de más cómputo y un PSNR final
  de entrenamiento menor (35,17 dB frente a 38,65 dB).
- La geometría del objeto condiciona el algoritmo: la forma discoidal convergió rápido con alta precisión numérica;
  la cónica costó más cómputo pero dio el mejor resultado perceptual (LPIPS más bajo).
- La calidad visual no siempre coincide con la precisión píxel a píxel: en patrimonio cultural las métricas numéricas
  deben complementarse con LPIPS.
- Aporte: un pipeline reproducible y un marco de evaluación dual adaptados a museos con recursos limitados.

## Límites y siguientes pasos

- El visor de nubes de puntos .ply descarga el archivo y muestra el progreso, pero el renderizado de ese formato
  en Three.js sigue pendiente. Los modelos glTF sí se renderizan y son interactivos.
