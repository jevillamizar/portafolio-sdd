import { Outlet } from 'react-router'
import RouteEffects from './RouteEffects'
import './Layout.css'

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <RouteEffects />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
    </>
  )
}
