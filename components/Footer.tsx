import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--header)' }} className="text-white px-6 py-8 mt-16">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm opacity-70 mb-4">
          © 2025 雑煮文化遺産 ZONI HERITAGE
        </p>
        <div className="flex justify-center gap-6 text-sm opacity-70 mb-4">
          <Link href="/terms" className="hover:opacity-100 transition">利用規約</Link>
          <Link href="/privacy" className="hover:opacity-100 transition">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:opacity-100 transition">お問い合わせ</Link>
        </div>
        <p className="text-xs opacity-50 leading-relaxed max-w-xl mx-auto">
          ※ 投稿された文章・画像等のコンテンツは、雑煮文化の記録・紹介・研究を目的として、
          当サイト内の掲載のほか、公式SNS、広報資料、紹介記事等で
          掲載・紹介される場合があります。
        </p>
      </div>
    </footer>
  )
}
