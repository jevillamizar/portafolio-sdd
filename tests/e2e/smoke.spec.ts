import { expect, type Page, test } from '@playwright/test'

const routes = [
  { path: '/', h1: 'Inicio' },
  { path: '/trabajo', h1: 'Trabajo' },
  { path: '/hoja-de-vida', h1: 'Hoja de vida' },
  { path: '/ruta-que-no-existe', h1: 'Página no encontrada' },
]

async function hasHorizontalScroll(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
}

test.describe('rutas', () => {
  for (const route of routes) {
    test(`${route.path} carga directo con el layout completo`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toHaveText(route.h1)
      await expect(page.getByRole('banner')).toBeVisible()
      await expect(page.getByRole('main')).toBeVisible()
      await expect(page.getByRole('contentinfo')).toBeVisible()
      await expect(page).toHaveTitle(/\S/)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/)
    })
  }

  test('cada ruta tiene un title distinto', async ({ page }) => {
    const titles = new Set<string>()
    for (const route of routes) {
      await page.goto(route.path)
      await expect(page.locator('h1')).toHaveText(route.h1)
      titles.add(await page.title())
    }
    expect(titles.size).toBe(routes.length)
  })

  test('la 404 enlaza a Inicio', async ({ page }) => {
    await page.goto('/ruta-que-no-existe')
    await page.getByRole('link', { name: 'Volver al inicio' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toHaveText('Inicio')
  })
})

test.describe('navbar en escritorio', () => {
  test('el logotipo y los enlaces llevan a las rutas correctas', async ({ page }) => {
    await page.goto('/trabajo')
    const nav = page.getByRole('navigation', { name: 'Principal' })
    await expect(page.getByRole('link', { name: 'esteban' })).toHaveAttribute('href', '/')
    await expect(nav.getByRole('link', { name: 'Trabajo' })).toHaveAttribute('href', '/trabajo')
    await expect(nav.getByRole('link', { name: 'Hoja de vida' })).toHaveAttribute('href', '/hoja-de-vida')
    await expect(nav.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/#contacto')
    await expect(page.getByRole('button', { name: 'Menú' })).toBeHidden()
  })

  test('marca la página actual y al navegar enfoca el h1', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Principal' })
    await nav.getByRole('link', { name: 'Hoja de vida' }).click()
    await expect(page).toHaveURL('/hoja-de-vida')
    await expect(page.locator('h1')).toBeFocused()
    await expect(nav.getByRole('link', { name: 'Hoja de vida' })).toHaveAttribute('aria-current', 'page')
  })

  test('"Saltar al contenido" es el primer elemento enfocable y lleva a main', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible() // la SPA ya renderizó
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Saltar al contenido' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()
  })
})

test.describe('móvil (390px)', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('el menú abre, se cierra con Escape y al navegar', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Menú' })
    const nav = page.getByRole('navigation', { name: 'Principal' })
    const trabajo = nav.getByRole('link', { name: 'Trabajo' })

    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(trabajo).toBeHidden()

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(trabajo).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(trabajo).toBeHidden()
    await expect(button).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(trabajo).toBeVisible()
    await trabajo.click()
    await expect(page).toHaveURL('/trabajo')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(trabajo).toBeHidden()
  })

  for (const route of routes) {
    test(`${route.path} no tiene scroll horizontal`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page.locator('h1')).toHaveText(route.h1)
      expect(await hasHorizontalScroll(page)).toBe(false)
    })
  }
})
