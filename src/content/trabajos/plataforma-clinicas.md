---
type: producto
title: Plataforma SaaS de agendamiento y gestión clínica para centros estéticos
organization: Proyecto propio
period: 2025 – 2026
year: 2025
role: Desarrollador Full Stack y DevOps
status: produccion
summary: Plataforma multi-tenant donde cada clínica estética gestiona agenda, pacientes, historia clínica y consentimiento informado en su propio subdominio, con datos aislados por schema.
stack: [Python, Django, django-tenants, PostgreSQL, React, TypeScript, Tailwind, Vitest, Docker, Google Cloud Run, Artifact Registry, Google Calendar API]
order: 1
---

## El problema

Las clínicas estéticas operan con WhatsApp, hojas de cálculo e historias clínicas en papel.
Además, cada clínica trabaja distinto: unas exigen historia clínica en cada procedimiento y otras no;
unas usan Google Calendar y otras no usan nada. El producto tenía que adaptarse por configuración,
sin crear ramas de código por cliente.

## Qué construí

- **Multi-tenancy por schema** con django-tenants: cada clínica tiene su subdominio, el middleware
  resuelve el dominio en el schema compartido y activa el schema de esa clínica antes de cualquier consulta.
- **Flujo de atención.** Al atender una cita se llena la historia clínica y, si el procedimiento lo requiere,
  el consentimiento informado se firma al final de esa misma historia. Ambos módulos se activan o desactivan
  por clínica (feature flags) y cada procedimiento marca si exige consentimiento.
- **Agenda sin dependencia externa.** La disponibilidad sigue un orden de prioridad: Google Calendar si está
  conectado, luego los horarios de atención configurados por día y, por último, hora manual con validación
  de conflictos.
- **Cierre de cita atómico.** Un endpoint guarda la historia, crea el consentimiento y marca la cita como
  completada dentro de una transacción. Si un paso falla, se revierte todo.
- **Documentos de solo lectura** con los mismos componentes del flujo de atención (modo lectura y edición),
  enlace a la cita de origen e impresión con membrete de la clínica.
- **Landing por clínica** con bandera de publicación: mientras no se publique, muestra una vista de "próximamente".

## Decisiones de ingeniería

- **Revisión adversarial antes de cada commit.** En el módulo de historia clínica encontró 11 hallazgos.
  Los críticos: consentimientos cargados por paciente en lugar de por historia clínica, que podían mostrar
  la firma de otra cita, y firmas sin límite de tamaño. Todos se corrigieron con tests.
- **Componentes compartidos en dos modos.** El formulario de historia y el de consentimiento existen una sola vez.
  Cuando el refactor exigió props nuevas, se corrigió el componente y no el consumidor.
- **Migraciones aditivas con valores por defecto**, aplicadas por un job de Cloud Run antes de cada despliegue,
  sin afectar a las clínicas existentes.

## Resultados

- En producción en Google Cloud Run, con backend y frontend como servicios separados e imágenes en Artifact Registry.
- Incidente de despliegue resuelto y documentado: el job de migraciones solo migraba los schemas de tenant,
  una columna nueva del schema compartido no se creó y el login devolvió error 500. Lo diagnostiqué en los logs
  de Cloud Run, corregí el job para migrar ambos niveles y actualicé el runbook de despliegue.

## Límites y siguientes pasos

- En lanzamiento: validación con clínicas de Colombia para priorizar el siguiente bloque de funcionalidades.
