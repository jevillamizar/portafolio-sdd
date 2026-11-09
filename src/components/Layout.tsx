import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'
import RouteEffects from './RouteEffects'
import './Layout.css'

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <RouteEffects />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
