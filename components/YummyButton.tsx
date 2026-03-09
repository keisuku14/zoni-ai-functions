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
      alert('Yummyするにはログインが必要です')
      return
    }
    if (loading) return
    setLoading(true)
    try {
      await toggleYummy(postId, userId)
      // トランザクション後にカウントを反映
      // onSnapshotで自動更新されるが、即時フィードバックのため仮更新
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
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 text-amber-700 hover:bg-amber-50 transition disabled:opacity-50"
    >
      <span>🍚</span>
      <span className="font-bold">{count}</span>
      <span className="text-sm">Yummy!</span>
    </button>
  )
}
