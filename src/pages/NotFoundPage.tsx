import { Link } from 'react-router'
import PageMeta from '../components/PageMeta'
import { pageTitle } from '../lib/meta'

export default function NotFoundPage() {
  return (
    <div className="container page">
      <PageMeta title={pageTitle('Página no encontrada')} description="La página que buscas no existe." />
      <h1>Página no encontrada</h1>
      <p>La página que buscas no existe o cambió de dirección.</p>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  )
}
