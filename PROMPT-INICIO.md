# Prompt de arranque para Claude Code

Pega esto en la primera sesión, con el modo plan activado (Shift+Tab):

```
Vamos a construir mi portafolio profesional bajo Desarrollo Guiado por
Especificaciones (SDD). Este repositorio ya tiene:

- CLAUDE.md con las reglas del agente
- docs/ con estándares, diseño, modelo de contenido, despliegue, un ADR y 6 specs (000 a 005)
- docs/referencia/ con dos capturas del estilo que quiero
- .claude/commands/ con los comandos /enriquecer /spec /implementar /verificar /adversarial /cerrar
- src/content/trabajos/ con los 7 trabajos ya redactados
- src/data/hoja-de-vida.json con mi hoja de vida

Paso 1 (solo lectura): lee CLAUDE.md, todos los archivos de docs/ y mira las
dos imágenes de docs/referencia/. Revisa también el proyecto Astro que ya está
creado en la raíz.

Paso 2: dime en una lista corta:
- si algún spec contradice a otro o a docs/design.md
- si el orden 000 → 005 tiene dependencias mal planteadas
- qué dependencias de npm vas a agregar en el spec 000 (y por qué cada una)
- máximo 3 preguntas, solo si son bloqueantes

No escribas código todavía. Cuando yo apruebe, empezamos con
/implementar spec 000 tarea 1.
```

## Flujo por spec

```
/implementar spec 000 tarea 1
   ... (una tarea a la vez, con tu OK entre cada una)
/verificar spec 000
/adversarial spec 000
/cerrar spec 000
git push  →  se publica solo
```

Repite con 001, 002, 003 y 004. Con 000 a 003 ya tienes un sitio útil en línea;
004 agrega la hoja de vida y 005 lo deja listo para compartir.
