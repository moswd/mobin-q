import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import AuthProvider from '@providers/AuthProvider'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
