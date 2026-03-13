'use client'

import { useState } from 'react'
import { toggleYummy } from '@/lib/firestore'

type Props = {
  postId: string
  initialCount: number
  userId?: string
}

export default function YummyButton({ postId, initialCount, userId }: Props) {
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!userId) {
      alert('「美味しそう！」するにはログインが必要です')
      return
    }
    if (loading) return
    setLoading(true)
    try {
      await toggleYummy(postId, userId)
      setCount((prev) => prev + 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition disabled:opacity-50"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
      }}
    >
      <span>🍚</span>
      <span className="font-bold text-sm">{count}</span>
      <span className="text-xs">美味しそう！</span>
    </button>
  )
}
