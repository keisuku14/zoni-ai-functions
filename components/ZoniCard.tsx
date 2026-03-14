import Link from 'next/link'
import Image from 'next/image'
import { ZoniPost } from '@/types/zoni'

// regionCurrentから都道府県を抽出
function extractPrefecture(regionCurrent: string): string {
  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
  ]
  const found = prefectures.find((p) => regionCurrent.includes(p))
  return found ?? regionCurrent
}

type Props = {
  post: ZoniPost
}

export default function ZoniCard({ post }: Props) {
  return (
    <Link href={`/zoni/${post.id}`}>
      <div
        className="rounded-xl overflow-hidden border cursor-pointer h-full card-hover"
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
          <Image
            src="/noimage-zoni.png"
            alt="No Image"
            fill
            className="object-cover opacity-60"
          />
          )}
          {/* 都道府県バッジ */}
                    {(post.regionRoot || post.regionCurrent) && (
            <div
              className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <span>🏡</span>
              <span>
                {(post.regionRoot === '海外' || post.regionRoot === 'その他')
                  ? extractPrefecture(post.regionCurrent || post.regionRoot || '')
                  : (post.regionRoot || extractPrefecture(post.regionCurrent || ''))}
              </span>
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
              📍{' '}
              {[post.regionCurrent, post.regionRoot].filter(Boolean).join(' / ')}
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
