import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

function focusWithoutScroll(element: HTMLElement) {
  if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1')
  element.focus({ preventScroll: true })
}

/**
 * Lo que un sitio de varias páginas hace solo y una SPA no:
 * al cambiar de ruta, scroll arriba (o al `#ancla`) y foco en el `h1` (o en el ancla).
 * En la carga inicial no mueve el foco; solo desplaza si la URL trae ancla.
 */
export default function RouteEffects() {
  const { key, hash } = useLocation()
  const previousKey = useRef<string | null>(null)

  useEffect(() => {
    if (previousKey.current === key) return // StrictMode ejecuta el efecto dos veces
    const isInitialLoad = previousKey.current === null
    previousKey.current = key

    const id = decodeURIComponent(hash.slice(1))
    const target = id ? document.getElementById(id) : null
    if (target) {
      target.scrollIntoView?.()
      if (!isInitialLoad) focusWithoutScroll(target)
      return
    }
    if (isInitialLoad) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const heading = document.querySelector('main h1')
    if (heading instanceof HTMLElement) focusWithoutScroll(heading)
  }, [key, hash])

  return null
}
