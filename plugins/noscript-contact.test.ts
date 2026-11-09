import { describe, expect, it } from 'vitest'
import type { Person } from '../src/data/person-schema.ts'
import { NOSCRIPT_PLACEHOLDER, injectNoscriptContact, renderNoscriptContact } from './noscript-contact.ts'

const person: Person = {
  fullName: 'Nombre Completo',
  shortName: 'Nombre',
  title: 'Título',
  location: 'Ciudad',
  email: 'correo@ejemplo.com',
  linkedin: 'https://www.linkedin.com/in/ejemplo/',
  github: 'https://github.com/ejemplo',
}

describe('renderNoscriptContact', () => {
  it('incluye los tres canales de contacto', () => {
    const html = renderNoscriptContact(person)
    expect(html).toContain('href="mailto:correo@ejemplo.com"')
    expect(html).toContain('href="https://www.linkedin.com/in/ejemplo/"')
    expect(html).toContain('href="https://github.com/ejemplo"')
    expect(html).toContain('<noscript>')
  })

  it('escapa caracteres HTML', () => {
    const html = renderNoscriptContact({ ...person, fullName: '<script>"x"&</script>' })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;&quot;x&quot;&amp;&lt;/script&gt;')
  })
})

describe('injectNoscriptContact', () => {
  it('reemplaza el marcador por el bloque noscript', () => {
    const html = injectNoscriptContact(`<body>${NOSCRIPT_PLACEHOLDER}</body>`, person)
    expect(html).not.toContain(NOSCRIPT_PLACEHOLDER)
    expect(html).toContain('mailto:correo@ejemplo.com')
  })

  it('falla si index.html no tiene el marcador', () => {
    expect(() => injectNoscriptContact('<body></body>', person)).toThrow(/marcador/)
  })
})
