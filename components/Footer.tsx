import Link from 'next/link'

const gold = '#c9a84c'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--header)' }} className="px-6 py-8 mt-16">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm mb-4" style={{ color: gold, opacity: 0.8 }}>
          © 2025 雑煮文化遺産 ZONI HERITAGE
        </p>
        <div className="flex justify-center gap-6 text-sm mb-4">
          <Link href="/terms" className="hover:opacity-100 transition" style={{ color: gold, opacity: 0.8 }}>利用規約</Link>
          <Link href="/privacy" className="hover:opacity-100 transition" style={{ color: gold, opacity: 0.8 }}>プライバシーポリシー</Link>
          <Link href="/contact" className="hover:opacity-100 transition" style={{ color: gold, opacity: 0.8 }}>お問い合わせ</Link>
        </div>
        <p className="text-xs leading-relaxed max-w-xl mx-auto" style={{ color: gold, opacity: 0.5 }}>
          ※ 投稿された文章・画像等のコンテンツは、雑煮文化の記録・紹介・研究を目的として、
          当サイト内の掲載のほか、公式SNS、広報資料、紹介記事等で
          掲載・紹介される場合があります。
        </p>
      </div>
    </footer>
  )
}
