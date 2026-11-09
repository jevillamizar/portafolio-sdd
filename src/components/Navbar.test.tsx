import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

function renderNavbar(initialPath = '/') {
  const router = createMemoryRouter(
    [{ path: '*', element: <Navbar /> }],
    { initialEntries: [initialPath] },
  )
  render(<RouterProvider router={router} />)
  return router
}

const menuButton = () => screen.getByRole('button', { name: 'Menú' })
const nav = () => screen.getByRole('navigation', { name: 'Principal' })

describe('Navbar', () => {
  it('el logotipo "esteban" lleva a Inicio', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: 'esteban' })).toHaveAttribute('href', '/')
  })

  it('enlaza a Trabajo, Hoja de vida y Contacto', () => {
    renderNavbar()
    const links = within(nav())
    expect(links.getByRole('link', { name: 'Trabajo' })).toHaveAttribute('href', '/trabajo')
    expect(links.getByRole('link', { name: 'Hoja de vida' })).toHaveAttribute('href', '/hoja-de-vida')
    expect(links.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/#contacto')
  })

  it('marca con aria-current solo el enlace de la ruta actual', () => {
    renderNavbar('/trabajo')
    const links = within(nav())
    expect(links.getByRole('link', { name: 'Trabajo' })).toHaveAttribute('aria-current', 'page')
    expect(links.getByRole('link', { name: 'Hoja de vida' })).not.toHaveAttribute('aria-current')
    expect(links.getByRole('link', { name: 'Contacto' })).not.toHaveAttribute('aria-current')
  })

  it('en Inicio, Contacto no queda marcado como página actual', () => {
    renderNavbar('/')
    expect(within(nav()).getByRole('link', { name: 'Contacto' })).not.toHaveAttribute('aria-current')
  })

  it('el botón de menú controla la lista y empieza cerrado', () => {
    renderNavbar()
    const button = menuButton()
    expect(button).toHaveAttribute('aria-expanded', 'false')
    const controlled = document.getElementById(button.getAttribute('aria-controls') ?? '')
    expect(controlled).not.toBeNull()
    expect(nav()).toContainElement(controlled)
  })

  it('abre y cierra con clic', async () => {
    renderNavbar()
    await userEvent.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('abre con teclado (Enter y Espacio)', async () => {
    renderNavbar()
    menuButton().focus()
    await userEvent.keyboard('{Enter}')
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true')
    await userEvent.keyboard(' ')
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('Escape cierra el menú y devuelve el foco al botón', async () => {
    renderNavbar()
    await userEvent.click(menuButton())
    within(nav()).getByRole('link', { name: 'Trabajo' }).focus()
    await userEvent.keyboard('{Escape}')
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton()).toHaveFocus()
  })

  it('navegar cierra el menú', async () => {
    renderNavbar()
    await userEvent.click(menuButton())
    await userEvent.click(within(nav()).getByRole('link', { name: 'Trabajo' }))
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })
})
