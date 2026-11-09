import { getPerson } from '../data/resume'

/** Título del documento: `<sección> · <nombre corto>`, o solo el nombre corto. */
export function pageTitle(section?: string): string {
  const name = getPerson().shortName
  return section ? `${section} · ${name}` : name
}
