import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento #root')

// El enrutador y el layout llegan en la tarea 4 del spec 000.
createRoot(root).render(<StrictMode />)
