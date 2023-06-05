import { useState } from 'react'

type Callback = (token: string, studentId: string) => void

interface SignInResponse {
  status: number
  token: string
}

export function useSignIn(callback?: Callback) {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [token, setToken] = useState('')

  async function attempt(studentId: number) {
    setToken('')
    setFailed(false)
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/signIn/`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentID: studentId })
      })

      if (!res.ok) throw new Error('not ok')

      const json = (await res.json()) as SignInResponse

      setToken(json.token)
      if (callback) callback(json.token, studentId.toString())
    } catch (_) {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    failed,
    token,
    attempt
  }
}
