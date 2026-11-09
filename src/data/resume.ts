import { z } from 'zod'
import resumeJson from './hoja-de-vida.json'

/**
 * Esquema de la hoja de vida (`hoja-de-vida.json`).
 * Crece por specs: 000 → `person`, 001 → `home`, 004 → el resto (ver docs/content-model.md).
 */
export const personSchema = z.object({
  fullName: z.string().min(1),
  shortName: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  email: z.email(),
  linkedin: z.url(),
  github: z.url(),
})

export type Person = z.infer<typeof personSchema>

const person = personSchema.parse(resumeJson.person)

export function getPerson(): Person {
  return person
}
