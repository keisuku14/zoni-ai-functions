import Link from 'next/link'
import Image from 'next/image'
import { ZoniPost } from '@/types/zoni'

type Props = {
  post: ZoniPost
}

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

export default function MyPageCard({ post }: Props) {
  const postUrl = `https://zoni-heritage.jp/zoni/${post.id}`
  const shareText = `${post.familyName}のお雑煮を記録しました！ #雑煮文化遺産 #お雑煮`

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`
    window.open(url, '_blank')
  }

  const handleInstagramShare = () => {
    // InstagramはURL共有非対応のため、コピー促す
    navigator.clipboard.writeText(`${shareText} ${postUrl}`)
    alert('URLをコピーしました！Instagramのキャプションに貼り付けてください。')
  }

  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col"
      style={{ backgroundColor: '#1a1a1a', borderColor: 'var(--border)' }}
    >
      {/* 画像 */}
      <div className="relative w-full h-44 bg-gray-900 shrink-0">
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
        {/* ルーツバッジ */}
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
      <div className="p-4 flex flex-col flex-1" style={{ backgroundColor: '#f5efe6' }}>
        {/* 家名 */}
        <h2
          className="font-bold text-base mb-1"
          style={{ color: 'var(--text)', fontFamily: 'serif' }}
        >
          {post.familyName}
        </h2>

        {/* 地域 */}
        {(post.regionRoot || post.regionCurrent) && (
          <p className="text-xs mb-2" style={{ color: 'var(--accent)' }}>
            📍 {[post.regionCurrent, post.regionRoot].filter(Boolean).join(' / ')}
          </p>
        )}

        {/* タグ */}
        <div className="flex gap-1 flex-wrap mb-3">
          {post.soupBase && (
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: '#e8d5bc', color: 'var(--text)' }}
            >
              🍲 {post.soupBase}
            </span>
          )}
          {post.mochiType && (
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: '#e8d5bc', color: 'var(--text)' }}
            >
              🫓 {post.mochiType}
            </span>
          )}
        </div>

        {/* 説明 */}
        <p
          className="text-xs leading-relaxed line-clamp-2 mb-3"
          style={{ color: 'var(--text)', opacity: 0.8 }}
        >
          {post.description}
        </p>

        {/* SNSシェア */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={handleTwitterShare}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded transition hover:opacity-80"
            style={{ backgroundColor: '#000', color: 'white' }}
          >
            𝕏 シェア
          </button>
          <button
            onClick={handleInstagramShare}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded transition hover:opacity-80"
            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: 'white' }}
          >
            📷 コピー
          </button>
        </div>

        {/* 編集・詳細ボタン */}
        <div className="flex gap-2 mt-auto pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link
            href={`/zoni/edit/${post.id}`}
            className="flex-1 text-center text-xs py-2 rounded font-bold transition hover:opacity-80"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            編集
          </Link>
          <Link
            href={`/zoni/${post.id}`}
            className="flex-1 text-center text-xs py-2 rounded font-bold transition hover:opacity-80"
            style={{ backgroundColor: '#2c1a0e', color: 'white' }}
          >
            詳細
          </Link>
        </div>
      </div>
    </div>
  )
}
