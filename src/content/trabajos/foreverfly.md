---
type: empresa
title: "ForeverFly: plataforma de venta de vuelos"
organization: Group FullStack SAS
period: Ene 2025 – Feb 2026
year: 2025
role: Full Stack Developer
status: finalizado
summary: Arquitectura orientada a eventos con Kafka, APIs Laravel integradas con Amadeus y frontend en React con TypeScript para una plataforma de compra de vuelos.
stack: [Laravel, Apache Kafka, PostgreSQL, React, TypeScript, OpenAPI, JWT]
order: 4
---

## Qué construí

- Arquitectura orientada a eventos con Apache Kafka: Laravel publica el evento *FlightPurchased* y servicios
  independientes lo consumen para pagos, notificaciones por correo, analítica y generación de documentos PDF,
  desacoplando el flujo de compra.
- Más de 12 APIs REST en Laravel integradas con servicios externos (Amadeus), con caché distribuido y circuit breakers.
- Esquemas en PostgreSQL con migraciones, índices, particionamiento de tablas de transacciones históricas
  y réplicas de lectura para consultas pesadas.
- Sistema distribuido (usuarios, pagos y administración) con interfaz en React y TypeScript y más de 20 componentes reutilizables.
- APIs documentadas con OpenAPI/Swagger, autenticación JWT y autorización por roles.

## Resultados

- 99,9 % de disponibilidad en las APIs integradas con Amadeus.
- 25 % menos errores en tiempo de ejecución en el frontend.
- Principios SOLID, arquitectura por capas, pruebas unitarias y entrega continua.
