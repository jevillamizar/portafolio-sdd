import resumeJson from './hoja-de-vida.json'
import { type Person, personSchema } from './person-schema'

/**
 * Hoja de vida (`hoja-de-vida.json`) validada.
 * El esquema crece por specs: 000 → `person`, 001 → `home`, 004 → el resto (ver docs/content-model.md).
 */
export { personSchema, type Person }

const person = personSchema.parse(resumeJson.person)

export function getPerson(): Person {
  return person
}
