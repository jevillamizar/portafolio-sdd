import PageMeta from '../components/PageMeta'
import { getPerson } from '../data/resume'
import { pageTitle } from '../lib/meta'

const person = getPerson()

// Provisional: el contenido real del Inicio llega en el spec 001.
export default function HomePage() {
  return (
    <div className="container page">
      <PageMeta title={pageTitle()} description={`${person.title}. ${person.location}.`} />
      <h1>Inicio</h1>
    </div>
  )
}
