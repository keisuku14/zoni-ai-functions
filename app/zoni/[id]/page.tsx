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

  const formatDate = (ts: any) => {
    if (!ts) return null
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: `${post.familyName}のお雑煮`,
            description: post.description,
            image: post.imageUrl ?? '',
            recipeCategory: '雑煮',
            recipeCuisine: '日本料理',
            keywords: `雑煮,${post.regionRoot ?? ''},${post.soupBase ?? ''}`,
            recipeIngredient: post.ingredients ?? [],
            author: {
              '@type': 'Person',
              name: post.familyName,
            },
          }),
        }}
      />

      {/* 戻るボタン */}
      <button
        onClick={() => router.back()}
        className="text-sm mb-4 px-4 py-1.5 rounded border transition hover:opacity-70"
        style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
      >
        ← 一覧に戻る
      </button>

      {/* 黒盆カード */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '4px solid var(--accent)', backgroundColor: '#1a1a1a' }}
      >
        {/* 画像エリア */}
        <div className="relative w-full" style={{ aspectRatio: '16/9', backgroundColor: '#1a1a1a' }}>
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

        {/* 黒盆：家名・地域・日付 */}
        <div className="px-6 py-4" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="flex items-start justify-between gap-2">
            <h1
              className="text-2xl font-bold"
              style={{ color: 'white', fontFamily: 'serif' }}
            >
              {post.familyName}
            </h1>
            <div className="flex items-center gap-2 shrink-0">
              <YummyButton
                postId={post.id!}
                initialCount={post.yummyCount ?? 0}
                userId={user?.uid}
              />
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
          </div>

          {(post.regionCurrent || post.regionRoot) && (
            <p className="text-sm mt-1" style={{ color: 'var(--accent)' }}>
              📍 {post.regionCurrent}{post.regionRoot ? `（ルーツ：${post.regionRoot}）` : ''}
            </p>
          )}

          <p className="text-xs mt-1 opacity-50" style={{ color: 'white' }}>
            {formatDate(post.createdAt) && `作成日：${formatDate(post.createdAt)}`}
            {formatDate(post.updatedAt) && ` ／ 更新日：${formatDate(post.updatedAt)}`}
          </p>
        </div>

        {/* 和紙：スープ・餅・具材 */}
        <div className="py-2" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="mx-3 rounded-lg px-5 py-5" style={{ backgroundColor: '#f5efe6' }}>
            <div className="space-y-2 mb-4">
              {post.soupBase && (
                <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span className="text-base">🍲</span>
                 <span><strong>スープ：</strong>{post.soupBase}</span>
               </p>
             )}
              {post.mochiType && (
                <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span className="text-base">🫓</span>
                  <span><strong>餅タイプ：</strong>{post.mochiType}</span>
                </p>
              )}
              {post.parsed?.seasoning && (
                <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span className="text-base">🧂</span>
                  <span><strong>味付け：</strong>{post.parsed.seasoning}</span>
                </p>
              )}
              {post.ingredients && post.ingredients.length > 0 && (
                <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <span className="text-base">🥕</span>
                  <span><strong>具材：</strong>{post.ingredients.join('・')}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 黒盆：投稿者コメント */}
        <div className="px-6 py-4" style={{ backgroundColor: '#1a1a1a' }}>
          <p className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            📝 投稿者のコメント
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'white', opacity: 0.85 }}>
            {post.description}
          </p>
        </div>

        {/* 和紙：詳細レシピ */}
        {post.detailedRecipe && (
          <div className="py-2" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="mx-3 rounded-lg px-5 py-5" style={{ backgroundColor: '#f5efe6' }}>
              <p className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                🍳 詳細レシピ
              </p>
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: 'var(--text)' }}
              >
                {post.detailedRecipe}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
