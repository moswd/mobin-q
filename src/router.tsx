import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'

import Root from '@layouts/Root'
import SignIn from '@components/SignIn'
import Questions from '@components/Questions'

import { useAuth } from '@hooks/useAuth'

enum RouteMode {
  PROTECTED,
  R_PROTECTED,
  PUBLIC
}

interface ProtectedRouteProps {
  children: JSX.Element
  mode: RouteMode
}

function ProtectedRoute({ children, mode }: ProtectedRouteProps) {
  const { token } = useAuth()
  const location = useLocation()

  if (mode === RouteMode.PUBLIC) return children

  if (!token && mode === RouteMode.PROTECTED) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  if (token && mode === RouteMode.R_PROTECTED) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>not found</div>,
    children: [
      {
        path: '/',
        element: <Navigate to="questions" replace />
      },

      {
        path: 'questions',
        element: (
          <ProtectedRoute mode={RouteMode.PROTECTED}>
            <Questions />
          </ProtectedRoute>
        )
      },

      {
        path: 'sign-in',
        element: (
          <ProtectedRoute mode={RouteMode.R_PROTECTED}>
            <SignIn />
          </ProtectedRoute>
        )
      }
    ]
  }
])
