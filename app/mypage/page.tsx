'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import { ZoniPost } from '@/types/zoni'
import MyPageCard from '@/components/MyPageCard'

export default function MyPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<ZoniPost[]>([])
  const [postsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'zoniPosts'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ZoniPost[]
      setPosts(data)
      setPostsLoading(false)
    })
    return () => unsubscribe()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text)' }}>読み込み中...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* プロフィール */}
      <div
        className="rounded-xl p-6 mb-8 border-2"
        style={{ backgroundColor: '#1a1a1a', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName ?? ''}
                className="w-16 h-16 rounded-full border-2"
                style={{ borderColor: 'var(--accent)' }}
              />
            )}
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: 'white', fontFamily: 'serif' }}
              >
                {user.displayName} さん
              </h1>
              <p className="text-sm opacity-60" style={{ color: 'white' }}>
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/zoni/new"
              className="px-5 py-2 rounded text-sm font-bold transition"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              新規投稿
            </Link>
            <button
              onClick={logout}
              className="px-5 py-2 rounded text-sm border transition hover:opacity-70"
              style={{ borderColor: 'var(--border)', color: 'white' }}
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>

      {/* 投稿一覧 */}
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        あなたの投稿（{posts.length}件）
      </h2>

      {postsLoading ? (
        <p style={{ color: 'var(--text)' }}>読み込み中...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="mb-4" style={{ color: 'var(--text)' }}>
            まだ投稿がありません
          </p>
          <Link
            href="/zoni/new"
            className="px-8 py-3 rounded font-bold transition"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            最初の雑煮を投稿する
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <MyPageCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
