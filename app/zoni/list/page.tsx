'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { subscribeZoniPosts } from '@/lib/firestore'
import { ZoniPost } from '@/types/zoni'
import ZoniCard from '@/components/ZoniCard'

export default function ZoniListPage() {
  const [posts, setPosts] = useState<ZoniPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filterRegion, setFilterRegion] = useState('')
  const [filterMochi, setFilterMochi] = useState('')
  const [filterSoup, setFilterSoup] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeZoniPosts((posts) => {
      setPosts(posts)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const filtered = posts.filter((p) => {
    if (filterRegion && p.regionRoot !== filterRegion) return false
    if (filterMochi && p.mochiType !== filterMochi) return false
    if (filterSoup && p.soupBase !== filterSoup) return false
    return true
  })

  const hasFilter = filterRegion || filterMochi || filterSoup

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1
        className="text-2xl font-bold text-center mb-6"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        投稿分布マップ
      </h1>

      {/* フィルタートグル */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 px-4 py-2 rounded border text-sm transition"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          ▼ フィルター
          {hasFilter && (
            <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      {/* フィルターパネル */}
      {showFilter && (
        <div
          className="border rounded-lg p-4 mb-6 text-sm"
          style={{ borderColor: 'var(--border)', backgroundColor: '#fdf8f2' }}
        >
          <p className="text-xs mb-3 opacity-60">
            ※・スープ・餅タイプ・地域で絞り込めます。
          </p>

          {/* スープ */}
          <div className="mb-4">
            <p className="font-bold mb-2" style={{ color: 'var(--text)' }}>
              噛み付き・スープで選ぶ
            </p>
            <div className="flex gap-2 flex-wrap">
              {['すべて', '醤油', '味噌', 'キャラメン 煮り白だし', 'しょう ゆ', 'あごとんこつ', '白味噌', '鶏ガラ', '魚だし', 'だず'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterSoup(s === 'すべて' ? '' : s)}
                  className="px-3 py-1 rounded text-xs border transition"
                  style={{
                    backgroundColor: filterSoup === s || (s === 'すべて' && !filterSoup) ? 'var(--accent)' : 'white',
                    color: filterSoup === s || (s === 'すべて' && !filterSoup) ? 'white' : 'var(--text)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 餅タイプ */}
          <div className="mb-4">
            <p className="font-bold mb-2" style={{ color: 'var(--text)' }}>
              餅タイプで選ぶ
            </p>
            <div className="flex gap-2 flex-wrap">
              {['すべて', '丸餅', '切り餅', '四角餅', '焼いた角餅', '角餅'].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMochi(m === 'すべて' ? '' : m)}
                  className="px-3 py-1 rounded text-xs border transition"
                  style={{
                    backgroundColor: filterMochi === m || (m === 'すべて' && !filterMochi) ? 'var(--accent)' : 'white',
                    color: filterMochi === m || (m === 'すべて' && !filterMochi) ? 'white' : 'var(--text)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 地域 */}
          <div className="mb-4">
            <p className="font-bold mb-2" style={{ color: 'var(--text)' }}>
              現住所の暮らしの地域で選ぶ
            </p>
            <div className="flex gap-2 flex-wrap">
              {['すべて', '北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州', '沖縄'].map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRegion(r === 'すべて' ? '' : r)}
                  className="px-3 py-1 rounded text-xs border transition"
                  style={{
                    backgroundColor: filterRegion === r || (r === 'すべて' && !filterRegion) ? 'var(--accent)' : 'white',
                    color: filterRegion === r || (r === 'すべて' && !filterRegion) ? 'white' : 'var(--text)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {hasFilter && (
            <button
              onClick={() => { setFilterRegion(''); setFilterMochi(''); setFilterSoup('') }}
              className="text-xs underline"
              style={{ color: 'var(--accent)' }}
            >
              フィルターをリセット
            </button>
          )}
        </div>
      )}

      {/* 件数 */}
      <p className="text-sm mb-4" style={{ color: 'var(--text)', opacity: 0.7 }}>
        表示件数：{filtered.length} / {posts.length}
      </p>

      {/* 一覧 */}
      {loading ? (
        <p className="text-center py-12" style={{ color: 'var(--text)' }}>読み込み中...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-12" style={{ color: 'var(--text)' }}>投稿がありません</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((post) => (
            <ZoniCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
