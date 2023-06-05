import { useEffect, useState } from 'react'
import { useAuth } from '@hooks/useAuth'

interface UnvoteResponse {
  status: number
  message: string
}

export function useUnvote() {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const { token, signOut } = useAuth()

  let abortController = new AbortController()

  async function attempt(): Promise<boolean> {
    setFailed(false)
    setLoading(true)

    abortController = new AbortController()

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/vote/`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        signal: abortController.signal
      })

      if (res.status === 401 && signOut) {
        signOut()
        throw new Error('unauthorized')
      }

      if (res.status === 400) throw new Error('voted_before')
      if (!res.ok) throw new Error('not ok')

      const json = (await res.json()) as UnvoteResponse

      return json.message.toLowerCase().startsWith('done')
    } catch (err: unknown) {
      setFailed(true)
    } finally {
      setLoading(false)
    }

    return false
  }

  useEffect(() => () => abortController.abort(), [])

  return {
    loading,
    failed,
    attempt
  }
}
