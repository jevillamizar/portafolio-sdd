import { describe, expect, it } from 'vitest'
import resumeJson from './hoja-de-vida.json'
import { getPerson, personSchema } from './resume'

describe('personSchema', () => {
  it('valida el person de hoja-de-vida.json', () => {
    const result = personSchema.safeParse(resumeJson.person)
    expect(result.success).toBe(true)
  })

  it('falla si falta el email', () => {
    const { email: _email, ...withoutEmail } = resumeJson.person
    const result = personSchema.safeParse(withoutEmail)
    expect(result.success).toBe(false)
  })

  it('falla si el email no es válido', () => {
    const result = personSchema.safeParse({ ...resumeJson.person, email: 'no-es-un-correo' })
    expect(result.success).toBe(false)
  })

  it('falla si LinkedIn o GitHub no son URL', () => {
    expect(personSchema.safeParse({ ...resumeJson.person, linkedin: 'linkedin' }).success).toBe(false)
    expect(personSchema.safeParse({ ...resumeJson.person, github: '' }).success).toBe(false)
  })
})

describe('getPerson', () => {
  it('devuelve los datos de person del JSON', () => {
    const person = getPerson()
    expect(person.fullName).toBe(resumeJson.person.fullName)
    expect(person.email).toBe(resumeJson.person.email)
    expect(person.linkedin).toBe(resumeJson.person.linkedin)
    expect(person.github).toBe(resumeJson.person.github)
  })
})
