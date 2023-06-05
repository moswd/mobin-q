import React, { useState } from 'react'

interface AuthContextData {
  token?: string
  studentId?: string
  signIn?: (token: string, studentId: string) => void
  signOut?: () => void
}

export const AuthContext = React.createContext<AuthContextData>({})

const TOKEN_KEY = 'token'
const ID_KEY = 'studentId'

type StorageKey = typeof TOKEN_KEY | typeof ID_KEY

function readFromLocalStoage(key: StorageKey) {
  return localStorage.getItem(key) ?? ''
}

function saveToLocalStorage(token: string, studentId: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(ID_KEY, studentId)
}

function clearLocalStorage() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ID_KEY)
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(readFromLocalStoage(TOKEN_KEY))
  const [studentId, setStudentId] = useState(readFromLocalStoage(ID_KEY))

  const signIn = (token: string, studentId: string) => {
    setToken(token)
    setStudentId(studentId)

    saveToLocalStorage(token, studentId)
  }

  const signOut = () => {
    setToken('')
    setStudentId('')

    clearLocalStorage()
  }

  return (
    <AuthContext.Provider value={{ token, studentId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
