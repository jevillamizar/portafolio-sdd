import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import Layout from './Layout'
import PageMeta from './PageMeta'

function PageA() {
  return (
    <>
      <PageMeta title="Página A" description="Descripción A" />
      <h1>Página A</h1>
    </>
  )
}

function PageB() {
  return (
    <>
      <PageMeta title="Página B" description="Descripción B" />
      <h1>Página B</h1>
      <section id="destino">
        <h2>Destino</h2>
      </section>
    </>
  )
}

function renderApp(initialPath = '/a') {
  const router = createMemoryRouter(
    [
      {
        element: <Layout />,
        children: [
          { path: '/a', element: <PageA /> },
          { path: '/b', element: <PageB /> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )
  render(<RouterProvider router={router} />)
  return router
}

function descriptionContent(): string | null {
  return document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null
}

describe('Layout', () => {
  it('el primer elemento enfocable es "Saltar al contenido" y apunta a #main', async () => {
    renderApp()
    await userEvent.tab()
    const skip = screen.getByRole('link', { name: 'Saltar al contenido' })
    expect(skip).toHaveFocus()
    expect(skip).toHaveAttribute('href', '#main')
    expect(document.getElementById('main')?.tagName).toBe('MAIN')
  })

  it('PageMeta fija title y description', () => {
    renderApp()
    expect(document.title).toBe('Página A')
    expect(descriptionContent()).toBe('Descripción A')
  })

  it('en la carga inicial no mueve el foco', () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1 })).not.toHaveFocus()
  })

  it('al navegar, el foco pasa al h1 y el title se actualiza', async () => {
    const router = renderApp()
    await act(() => router.navigate('/b'))
    const h1 = screen.getByRole('heading', { level: 1, name: 'Página B' })
    expect(h1).toHaveFocus()
    expect(document.title).toBe('Página B')
    expect(descriptionContent()).toBe('Descripción B')
  })

  it('al navegar a una URL con ancla, el foco pasa al elemento del ancla', async () => {
    const router = renderApp()
    await act(() => router.navigate('/b#destino'))
    expect(document.getElementById('destino')).toHaveFocus()
  })

  it('navegar otra vez a la misma ancla vuelve a enfocarla', async () => {
    const router = renderApp('/b#destino')
    screen.getByRole('heading', { level: 1 }).focus()
    await act(() => router.navigate('/b#destino'))
    expect(document.getElementById('destino')).toHaveFocus()
  })
})
