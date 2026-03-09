import Link from 'next/link'
import Image from 'next/image'
import { ZoniPost } from '@/types/zoni'

type Props = {
  post: ZoniPost
}

export default function ZoniCard({ post }: Props) {
  return (
    <Link href={`/zoni/${post.id}`}>
      <div
        className="rounded-xl overflow-hidden border cursor-pointer transition hover:opacity-90 hover:shadow-lg h-full"
        style={{ backgroundColor: '#1a1a1a', borderColor: 'var(--border)' }}
      >
        {/* 画像エリア */}
        <div className="relative w-full h-44 bg-gray-900">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.familyName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <span className="text-5xl">🍲</span>
            </div>
          )}
          {/* 都道府県バッジ */}
          {post.regionCurrent && (
            <div
              className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded font-bold"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              {post.regionCurrent}
            </div>
          )}
        </div>

        {/* テキストエリア */}
        <div className="p-4" style={{ backgroundColor: '#f5efe6' }}>
          {/* 家名 */}
          <h2
            className="font-bold text-base mb-1"
            style={{ color: 'var(--text)', fontFamily: 'serif' }}
          >
            {post.familyName}
          </h2>

          {/* 地域 */}
          {(post.regionRoot || post.regionCurrent) && (
            <p className="text-xs mb-2 flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              📍 {post.regionCurrent}
              {post.regionRoot && ` / ${post.regionRoot}`}
            </p>
          )}

          {/* タグ */}
          <div className="flex gap-1 flex-wrap mb-2">
            {post.soupBase && (
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: '#e8d5bc', color: 'var(--text)' }}
              >
                スープ：{post.soupBase}
              </span>
            )}
            {post.mochiType && (
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: '#e8d5bc', color: 'var(--text)' }}
              >
                餅：{post.mochiType}
              </span>
            )}
          </div>

          {/* 具材 */}
          {post.ingredients && post.ingredients.length > 0 && (
            <p className="text-xs mb-2" style={{ color: 'var(--text)', opacity: 0.7 }}>
              具材：{post.ingredients.join('・')}
            </p>
          )}

          {/* 説明 */}
          <p
            className="text-xs leading-relaxed line-clamp-3"
            style={{ color: 'var(--text)', opacity: 0.8 }}
          >
            {post.description}
          </p>

          {/* Yummy */}
          <div className="mt-3 pt-2 border-t flex items-center justify-between"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="text-xs" style={{ color: 'var(--text)', opacity: 0.5 }}>
              🍚 {post.yummyCount ?? 0}
            </span>
            <span className="text-xs" style={{ color: 'var(--accent)' }}>
              詳細を見る →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
