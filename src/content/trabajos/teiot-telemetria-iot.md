---
type: personal
title: "TEIOT: plataforma multi-tenant de telemetría IoT"
organization: Proyecto personal
period: 2026
year: 2026
role: Arquitecto y desarrollador Full Stack
status: en-desarrollo
summary: SaaS B2B para ingerir, vigilar y visualizar telemetría de dispositivos IoT en tiempo real, con aislamiento entre clientes en dos capas. Vertical de referencia, cadena de frío.
stack: [NestJS, TypeScript, PostgreSQL, Redis, MQTT 5, Mosquitto, React, Vite, React Native, Expo Router, Jest, Docker Compose, GitHub Actions, pnpm]
order: 3
---

## El problema

Empresas con varias sedes y equipos de refrigeración detectan tarde las fallas, pierden la trazabilidad
de quién atendió cada incidente y no tienen una vista consolidada entre sedes. En un sistema mal diseñado,
además, los datos de un cliente pueden filtrarse a otro.

Criterio crítico desde el primer commit: un usuario de la empresa A no puede consultar, modificar ni exportar
datos de la empresa B, aunque manipule IDs o identificadores de dispositivo.

## Qué construí

- **Ingesta dual:** HTTP batch y MQTT 5, con un simulador de dispositivos para demostrar el flujo completo sin hardware.
- **Alertas** con umbral configurable, duración e histéresis para evitar alertas por ruido, y reconocimiento
  y resolución trazables: quién, cuándo y con qué nota.
- **Dashboard web y app móvil Android** con bandeja de alertas, reconocimiento y resolución desde el celular.
- Monorepo pnpm con cuatro aplicaciones: API, web, móvil y simulador.

## Decisiones de ingeniería

- **Aislamiento en dos capas.** El tenant activo se deriva siempre del JWT o de la identidad del dispositivo,
  nunca de un tenant_id enviado por el cliente. Row-Level Security en PostgreSQL es la segunda barrera, con un rol
  de base de datos sin BYPASSRLS: un bug en la aplicación no basta para filtrar datos entre tenants.
- **Credenciales por dispositivo en el broker.** Cada dispositivo tiene su usuario en Mosquitto con el plugin oficial
  Dynamic Security y una ACL que solo le permite publicar en `devices/{deviceId}/#`. La API da de alta y revoca
  credenciales sin reiniciar el broker.
- **CI contra infraestructura real.** El pipeline levanta Postgres, Redis y Mosquitto con la configuración de producción
  y valida el health-check con todo arriba y con una dependencia caída, sin exponer detalles internos.
- **Decisiones registradas en ADRs** con alternativas descartadas: Dynamic Security, RLS como segunda barrera
  y monolito modular en vez de microservicios.

## Resultados

- Desarrollo con SDD y TDD; cada módulo se cierra con una revisión adversarial que busca fugas entre tenants
  y tests de intrusión IDOR/BOLA.
- Criterio de cobertura: 90 % o más en la lógica de negocio.

## Límites y siguientes pasos

- En desarrollo. El siguiente hito es un piloto con sensores reales.
