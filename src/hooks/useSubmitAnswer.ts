import { useEffect, useState } from 'react'
import { useAuth } from '@hooks/useAuth'

interface SubmitAnswerPayload {
  tarin_id: number
  student_names: string[]
}

interface SubmitAnswerResponse {
  status: number
  message: string
}

export function useSubmitAnswer() {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [votedBefore, setVotedBefore] = useState(false)

  const { token, signOut } = useAuth()

  let abortController = new AbortController()

  async function attempt(payload: SubmitAnswerPayload): Promise<boolean> {
    setFailed(false)
    setLoading(true)
    setVotedBefore(false)

    abortController = new AbortController()

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/vote/`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
        signal: abortController.signal
      })

      if (res.status === 401 && signOut) {
        signOut()
        throw new Error('unauthorized')
      }

      if (res.status === 400) throw new Error('voted_before')
      if (!res.ok) throw new Error('not ok')

      const json = (await res.json()) as SubmitAnswerResponse

      return json.message.toLowerCase().startsWith('done')
    } catch (err: unknown) {
      setVotedBefore((err as Error)?.message === 'voted_before')
      setFailed(true)
    } finally {
      setLoading(false)
    }

    return false
  }

  useEffect(() => () => abortController.abort(), [])

  function resetState() {
    setFailed(false)
    setLoading(false)
    setVotedBefore(false)
  }

  return {
    loading,
    failed,
    votedBefore,
    attempt,
    resetState
  }
}
