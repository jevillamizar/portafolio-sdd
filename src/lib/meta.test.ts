import { describe, expect, it } from 'vitest'
import resumeJson from '../data/hoja-de-vida.json'
import { pageTitle } from './meta'

describe('pageTitle', () => {
  it('compone "<sección> · <nombre corto>"', () => {
    expect(pageTitle('Trabajo')).toBe(`Trabajo · ${resumeJson.person.shortName}`)
  })

  it('sin sección devuelve solo el nombre corto', () => {
    expect(pageTitle()).toBe(resumeJson.person.shortName)
  })
})
