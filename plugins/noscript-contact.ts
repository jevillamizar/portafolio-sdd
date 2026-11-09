import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import { type Person, personSchema } from '../src/data/person-schema.ts'

export const NOSCRIPT_PLACEHOLDER = '<!-- noscript-contact -->'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/** Bloque `<noscript>` con los canales de contacto: el sitio es una SPA y sin JS no muestra nada más. */
export function renderNoscriptContact(person: Person): string {
  const name = escapeHtml(person.fullName)
  const email = escapeHtml(person.email)
  const linkedin = escapeHtml(person.linkedin)
  const github = escapeHtml(person.github)
  return [
    '<noscript>',
    '<div class="noscript-contact">',
    `<p><strong>${name}</strong></p>`,
    '<p>Este sitio necesita JavaScript. Puedes contactarme por:</p>',
    '<ul>',
    `<li><a href="mailto:${email}">${email}</a></li>`,
    `<li><a href="${linkedin}" rel="noopener noreferrer">LinkedIn</a></li>`,
    `<li><a href="${github}" rel="noopener noreferrer">GitHub</a></li>`,
    '</ul>',
    '</div>',
    '</noscript>',
  ].join('')
}

export function injectNoscriptContact(html: string, person: Person): string {
  if (!html.includes(NOSCRIPT_PLACEHOLDER)) {
    throw new Error(`index.html no tiene el marcador ${NOSCRIPT_PLACEHOLDER}`)
  }
  return html.replace(NOSCRIPT_PLACEHOLDER, renderNoscriptContact(person))
}

/** Plugin de Vite: lee `person` de la hoja de vida, lo valida y lo inyecta en index.html. */
export function noscriptContact(resumePath: string): Plugin {
  return {
    name: 'noscript-contact',
    transformIndexHtml(html) {
      const resume: unknown = JSON.parse(readFileSync(resumePath, 'utf8'))
      const person = personSchema.parse((resume as { person?: unknown }).person)
      return injectNoscriptContact(html, person)
    },
  }
}
