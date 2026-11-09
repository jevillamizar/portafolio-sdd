---
type: empresa
title: Plataforma de gestión de talento humano
organization: GPSTalent | Alfa Ingenieros
period: Jun 2026 – Oct 2026
year: 2026
role: Full Stack Developer
status: finalizado
summary: Remediación de un incidente crítico de seguridad (IDOR), rediseño del cargue masivo de datos de RRHH y control de acceso por roles en una plataforma con más de 500 clientes.
stack: [Python, Django, PostgreSQL, Vue.js, Docker, Linux, DBeaver]
order: 5
---

## Qué construí

- **Seguridad.** Remedié un incidente crítico (IDOR) que exponía datos personales: cerré más de 5 brechas de autorización
  y migré permisos basados en IDs fijos a un patrón de autorización independiente del ambiente.
- **Cargue masivo** de contratos, nómina y seguridad social rediseñado, con reporte de errores por fila y detección
  automática del empleado por nombre de archivo, eliminando procesos manuales de RRHH.
- Autenticación y control de acceso con permisos y roles para 4 tipos de usuario.
- Diseño de esquemas y migraciones de base de datos, con mantenimiento directo desde DBeaver y consola.
- Contenerización con Docker en Linux (consola y SSH).
- Interfaces en Vue.js (login, perfiles, componentes condicionales) integradas con los nuevos endpoints.

## Resultados

- Aplicación sirviendo a más de 500 clientes.
