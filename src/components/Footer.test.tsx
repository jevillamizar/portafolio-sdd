import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import resumeJson from '../data/hoja-de-vida.json'
import Footer from './Footer'

const { person } = resumeJson

describe('Footer', () => {
  it('es el contentinfo de la página', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('muestra © del año actual y el nombre completo', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} ${person.fullName}`)).toBeInTheDocument()
  })

  it('enlaza a GitHub, LinkedIn y correo desde person', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', person.github)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', person.linkedin)
    expect(screen.getByRole('link', { name: 'Correo' })).toHaveAttribute('href', `mailto:${person.email}`)
  })

  it('los enlaces externos abren en otra pestaña con rel="noopener noreferrer"', () => {
    render(<Footer />)
    for (const name of ['GitHub', 'LinkedIn']) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
