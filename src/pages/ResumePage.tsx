import PageMeta from '../components/PageMeta'
import { getPerson } from '../data/resume'
import { pageTitle } from '../lib/meta'

const person = getPerson()

// Provisional: la hoja de vida completa llega en el spec 004.
export default function ResumePage() {
  return (
    <div className="container page">
      <PageMeta
        title={pageTitle('Hoja de vida')}
        description={`Hoja de vida de ${person.fullName}: experiencia, proyectos, habilidades y formación.`}
      />
      <h1>Hoja de vida</h1>
    </div>
  )
}
