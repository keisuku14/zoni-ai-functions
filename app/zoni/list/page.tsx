'use client'

import { useEffect, useState } from 'react'
import { subscribeZoniPosts } from '@/lib/firestore'
import { ZoniPost, getPrefectureToRegion } from '@/types/zoni'
import ZoniCard from '@/components/ZoniCard'
import ZoniMap from '@/components/ZoniMap'

export default function ZoniListPage() {
  const [posts, setPosts] = useState<ZoniPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filterRegion, setFilterRegion] = useState('')
  const [filterMochi, setFilterMochi] = useState('')
  const [filterSoup, setFilterSoup] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 12

  useEffect(() => {
    const unsubscribe = subscribeZoniPosts((posts) => {
      setPosts(posts)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const filtered = posts.filter((p) => {
    if (filterRegion && getPrefectureToRegion(p.regionRoot ?? '') !== filterRegion) return false
    if (filterMochi && p.mochiType !== filterMochi) return false
    if (filterSoup && p.soupBase !== filterSoup) return false
    return true
  })

  const hasFilter = filterRegion || filterMochi || filterSoup

  // 投稿データから選択肢を動的生成
  const soupOptions = ['すべて', ...Array.from(new Set(posts.map(p => p.soupBase).filter(Boolean) as string[]))]
  const mochiOptions = ['すべて', ...Array.from(new Set(posts.map(p => p.mochiType).filter(Boolean) as string[]))]
  const regionOptions = ['すべて', ...Array.from(new Set(posts.map(p => getPrefectureToRegion(p.regionRoot ?? '')).filter(Boolean)))]
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handleFilterChange = (type: 'region' | 'mochi' | 'soup', value: string) => {
    if (type === 'region') setFilterRegion(value)
    if (type === 'mochi') setFilterMochi(value)
    if (type === 'soup') setFilterSoup(value)
    setCurrentPage(1)
  }

  const FilterPanel = () => (
    <div
      className="rounded-lg p-4 text-sm"
      style={{ backgroundColor: '#fdf8f2', border: '1px solid var(--border)' }}
    >
      <p className="text-xs mb-3 opacity-60">絞り込み</p>
      <p className="text-xs mb-3 opacity-60">味・餅・具材でで雑煮を探せます。</p>

      {/* スープ */}
      <div className="mb-4">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          style={{ color: 'var(--text)' }}
        >
          <p className="font-bold text-xs">味付け・スープで選ぶ</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {soupOptions.map((s) => (
            <button
              key={s}
              onClick={() => handleFilterChange('soup', s === 'すべて' ? '' : s)}
              className="px-2 py-1 rounded text-xs border transition mb-1"
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
        <p className="font-bold text-xs mb-2" style={{ color: 'var(--text)' }}>餅の種類で選ぶ</p>
        <div className="flex gap-1 flex-wrap">
          {mochiOptions.map((m) => (
            <button
              key={m}
              onClick={() => handleFilterChange('mochi', m === 'すべて' ? '' : m)}
              className="px-2 py-1 rounded text-xs border transition mb-1"
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

      {/* 現在の地域 */}
      <div className="mb-4">
        <p className="font-bold text-xs mb-2" style={{ color: 'var(--text)' }}>現在の暮らしの地域で選ぶ</p>
        <div className="flex gap-1 flex-wrap">
          {regionOptions.map((r) => (
            <button
              key={r}
              onClick={() => handleFilterChange('region', r === 'すべて' ? '' : r)}
              className="px-2 py-1 rounded text-xs border transition mb-1"
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

      {/* ルーツの地域 */}
      <div className="mb-4">
        <p className="font-bold text-xs mb-2" style={{ color: 'var(--text)' }}>🏡 ルーツの地域で選ぶ</p>
        <div className="flex gap-1 flex-wrap">
          {regionOptions.map((r) => (
            <button
              key={r}
              onClick={() => handleFilterChange('region', r === 'すべて' ? '' : r)}
              className="px-2 py-1 rounded text-xs border transition mb-1"
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
          onClick={() => { setFilterRegion(''); setFilterMochi(''); setFilterSoup(''); setCurrentPage(1) }}
          className="text-xs underline"
          style={{ color: 'var(--accent)' }}
        >
          フィルターをリセット
        </button>
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 地図 */}
      <h1
        className="text-2xl font-bold text-center mb-4"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        投稿分布マップ
      </h1>
      <div className="mb-6 rounded-xl overflow-hidden border-2" style={{ borderColor: 'var(--border)' }}>
        <ZoniMap posts={filtered} />
      </div>

      {/* 件数 */}
      <p className="text-sm mb-4" style={{ color: 'var(--text)', opacity: 0.7 }}>
        表示件数：{filtered.length} / {posts.length}
      </p>

      {/* PC：左固定フィルター＋右コンテンツ */}
      <div className="flex gap-6 items-start">

        {/* 左：フィルター（PC固定） */}
        <div className="hidden lg:block w-48 shrink-0 sticky top-4">
          <FilterPanel />
        </div>

        {/* 右：一覧 */}
        <div className="flex-1 min-w-0">

          {/* モバイル：フィルタートグル */}
          <div className="lg:hidden mb-4">
            <details className="rounded-lg border" style={{ borderColor: 'var(--border)' }}>
              <summary
                className="px-4 py-2 cursor-pointer text-sm font-bold flex items-center gap-2"
                style={{ color: 'var(--accent)' }}
              >
                ▼ フィルター
                {hasFilter && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>
                )}
              </summary>
              <div className="p-2">
                <FilterPanel />
              </div>
            </details>
          </div>

          {/* 一覧 */}
          {loading ? (
            <p className="text-center py-12" style={{ color: 'var(--text)' }}>読み込み中...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center py-12" style={{ color: 'var(--text)' }}>投稿がありません</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginated.map((post) => (
                  <ZoniCard key={post.id} post={post} />
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded border text-sm transition disabled:opacity-30"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  >
                    ← 前へ
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-9 h-9 rounded text-sm transition"
                      style={{
                        backgroundColor: currentPage === page ? 'var(--accent)' : 'white',
                        color: currentPage === page ? 'white' : 'var(--text)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded border text-sm transition disabled:opacity-30"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  >
                    次へ →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
