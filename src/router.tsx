import type { ComponentType } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router'
import Layout from './components/Layout'

type PageModule = { default: ComponentType }

/** Carga diferida: cada página es su propio chunk. */
function page(load: () => Promise<PageModule>): RouteObject['lazy'] {
  return async () => ({ Component: (await load()).default })
}

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, lazy: page(() => import('./pages/HomePage')) },
      { path: 'trabajo', lazy: page(() => import('./pages/WorkPage')) },
      { path: 'hoja-de-vida', lazy: page(() => import('./pages/ResumePage')) },
      { path: '*', lazy: page(() => import('./pages/NotFoundPage')) },
    ],
  },
]

export const router = createBrowserRouter(routes)
