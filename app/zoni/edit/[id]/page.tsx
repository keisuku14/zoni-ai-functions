'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getZoniPost } from '@/lib/firestore'
import { ZoniPost } from '@/types/zoni'
import { useAuth } from '@/contexts/AuthContext'
import YummyButton from '@/components/YummyButton'

export default function ZoniDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user } = useAuth()
  const [post, setPost] = useState<ZoniPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getZoniPost(id).then((data) => {
      setPost(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
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

  const isOwner = user?.uid === post.userId

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 戻るボタン */}
      <button
        onClick={() => router.back()}
        className="text-sm mb-6 block transition hover:opacity-70"
        style={{ color: 'var(--accent)' }}
      >
        ← 一覧に戻る
      </button>

      {/* メインカード */}
      <div
        className="rounded-xl overflow-hidden border-2"
        style={{ borderColor: 'var(--border)', backgroundColor: '#1a1a1a' }}
      >
        {/* 画像 */}
        <div className="relative w-full h-64 bg-gray-900">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.familyName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <span className="text-7xl">🍲</span>
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="p-6" style={{ backgroundColor: '#f5efe6' }}>
          {/* タイトルと編集ボタン */}
          <div className="flex items-start justify-between mb-3">
            <h1
              className="text-2xl font-bold"
              style={{ color: 'var(--text)', fontFamily: 'serif' }}
            >
              {post.familyName}
            </h1>
            {isOwner && (
              <Link
                href={`/zoni/edit/${post.id}`}
                className="text-xs px-3 py-1.5 rounded transition hover:opacity-80"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
              >
                編集
              </Link>
            )}
          </div>

          {/* 地域 */}
          {(post.regionRoot || post.regionCurrent) && (
            <p className="text-sm mb-3 flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              📍 {post.regionCurrent}
              {post.regionRoot && ` / ${post.regionRoot}`}
            </p>
          )}

          {/* タグ */}
          <div className="flex gap-2 flex-wrap mb-4">
            {post.mochiType && (
              <span
                className="text-sm px-3 py-1 rounded"
                style={{ backgroundColor: '#e8d5bc', color: 'var(--text)' }}
              >
                {post.mochiType}
              </span>
            )}
            {post.soupBase && (
              <span
                className="text-sm px-3 py-1 rounded"
                style={{ backgroundColor: '#e8d5bc', color: 'var(--text)' }}
              >
                {post.soupBase}
              </span>
            )}
          </div>

          {/* 説明 */}
          <div className="mb-4">
            <p
              className="text-sm font-bold mb-1"
              style={{ color: 'var(--accent)' }}
            >
              雑煮の説明
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text)' }}
            >
              {post.description}
            </p>
          </div>

          {/* 具材 */}
          {post.ingredients && post.ingredients.length > 0 && (
            <div className="mb-4">
              <p
                className="text-sm font-bold mb-2"
                style={{ color: 'var(--accent)' }}
              >
                具材
              </p>
              <div className="flex gap-2 flex-wrap">
                {post.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded border"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'white' }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 詳細レシピ */}
          {post.detailedRecipe && (
            <div className="mb-4">
              <p
                className="text-sm font-bold mb-1"
                style={{ color: 'var(--accent)' }}
              >
                詳細レシピ
              </p>
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: 'var(--text)' }}
              >
                {post.detailedRecipe}
              </p>
            </div>
          )}

          {/* Yummy */}
          <div
            className="mt-6 pt-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <YummyButton
              postId={post.id!}
              initialCount={post.yummyCount ?? 0}
              userId={user?.uid}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
