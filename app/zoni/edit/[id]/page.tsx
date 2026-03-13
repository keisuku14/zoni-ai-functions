'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getZoniPost, updateZoniPost } from '@/lib/firestore'
import { ZoniPost } from '@/types/zoni'
import { useAuth } from '@/contexts/AuthContext'
import ZoniForm from '@/components/ZoniForm'

export default function ZoniEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [post, setPost] = useState<ZoniPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getZoniPost(id).then((data) => {
      setPost(data)
      setLoading(false)
    })
  }, [id])

  // 権限チェック
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!loading && post && user && post.userId !== user.uid) {
      router.push(`/zoni/${id}`)
    }
  }, [loading, post, user, id, router])

  const handleSubmit = async (data: Partial<ZoniPost>, aiOverwritten: boolean) => {
    if (!id || !post) return
    await updateZoniPost(id, data)
    router.push(`/zoni/${id}`)
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text)' }}>読み込み中...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text)' }}>投稿が見つかりません</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="text-sm mb-6 block transition hover:opacity-70"
        style={{ color: 'var(--accent)' }}
      >
        ← 戻る
      </button>

      <h1
        className="text-2xl font-bold text-center mb-6 px-6 py-3 rounded-lg border"
        style={{ color: 'var(--accent)', fontFamily: 'serif', borderColor: 'var(--accent)', backgroundColor: 'white' }}
      >
        雑煮データの編集
      </h1>

      <ZoniForm
        initialData={post}
        onSubmit={handleSubmit}
        submitLabel="保存する"
      />
    </div>
  )
}
