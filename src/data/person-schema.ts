import { z } from 'zod'

/** Esquema de `person` en `hoja-de-vida.json`. Lo usan la app y los plugins de build. */
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
