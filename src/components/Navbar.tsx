import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { getPerson } from '../data/resume'
import './Navbar.css'

/** Logotipo de texto: el primer nombre de `person.shortName`, en minúsculas. */
const logo = (getPerson().shortName.split(' ')[0] ?? '').toLowerCase()

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const { key } = useLocation()

  // Cualquier navegación cierra el menú.
  useEffect(() => {
    setOpen(false)
  }, [key])

  // Escape cierra el menú y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo">
          {logo}
        </Link>
        <nav aria-label="Principal" className="site-nav" data-open={open}>
          <button
            ref={buttonRef}
            type="button"
            className="site-nav__toggle"
            aria-label="Menú"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="site-nav__toggle-line" aria-hidden="true" />
            <span className="site-nav__toggle-line site-nav__toggle-line--short" aria-hidden="true" />
          </button>
          <ul id={menuId} className="site-nav__list">
            <li>
              <NavLink to="/trabajo" className="site-nav__link">
                Trabajo
              </NavLink>
            </li>
            <li>
              <NavLink to="/hoja-de-vida" className="site-nav__link">
                Hoja de vida
              </NavLink>
            </li>
            <li>
              <Link to="/#contacto" className="site-nav__link">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
