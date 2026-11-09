import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom no implementa el scroll de la ventana.
window.scrollTo = () => {}

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('title, meta[name="description"]').forEach((node) => node.remove())
})
