import { useEffect, useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { TARINS_LIST } from './staticData'

export interface Tarin {
  ID: number
  tarinName: string
  studentNames: string[]
}

interface TarinListResponse {
  status: number
  message: Tarin[]
}

export function useTarinsList() {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [list, setList] = useState<Tarin[]>([])

  const { token, signOut } = useAuth()

  let abortController = new AbortController()

  async function attempt() {
    setFailed(false)
    setLoading(true)

    abortController = new AbortController()

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/vote/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        signal: abortController.signal
      })

      if (res.status === 401 && signOut) {
        signOut()
        throw new Error('unauthorized')
      }

      if (!res.ok) throw new Error('not ok')

      const json = (await res.json()) as TarinListResponse

      // uncomment next line to use test data
      // setList(TARINS_LIST)

      setList(json.message)
    } catch (_) {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    attempt()

    return () => {
      abortController.abort()
    }
  }, [])

  return {
    loading,
    failed,
    list,
    attempt
  }
}
