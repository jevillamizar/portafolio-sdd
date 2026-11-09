import PageMeta from '../components/PageMeta'
import { pageTitle } from '../lib/meta'

// Provisional: las cards llegan en el spec 002.
export default function WorkPage() {
  return (
    <div className="container page">
      <PageMeta title={pageTitle('Trabajo')} description="Proyectos y trabajos en los que he participado." />
      <h1>Trabajo</h1>
    </div>
  )
}
