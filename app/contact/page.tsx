import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1
        className="text-2xl font-bold mb-8 text-center"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        お問い合わせ
      </h1>
      <div
        className="rounded-xl p-8 space-y-6 text-sm leading-relaxed"
        style={{ backgroundColor: '#f5efe6', border: '2px solid var(--border)', color: 'var(--text)' }}
      >
        <p>
          雑煮文化遺産（ZONI HERITAGE）に関するご質問・ご要望・ご連絡は、以下の内容をご確認のうえ、お問い合わせください。
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>投稿内容に関する確認・修正・削除のご依頼</li>
          <li>不適切な投稿や権利侵害に関するご連絡</li>
          <li>雑煮文化に関する取材・研究・展示等のお問い合わせ</li>
          <li>サービス内容・不具合に関するお問い合わせ</li>
        </ul>

        <p className="text-xs opacity-70">
          ※ 投稿内容の削除・非公開等のご要望については、ご本人確認をお願いする場合があります。
        </p>
        <p className="text-xs opacity-70">
          ※ 内容によっては、回答までにお時間をいただく場合があります。
        </p>

        <section>
          <h2 className="font-bold text-base mb-3" style={{ color: 'var(--accent)' }}>
            連絡方法
          </h2>
          <p className="mb-4">現在、お問い合わせは以下の方法で受け付けています。</p>
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
          >
            <p className="font-bold mb-1">メールでのお問い合わせ</p>
            <p className="mb-1">
              メールアドレス：
              <a
                href="mailto:info@zoni-heritage.jp"
                className="underline"
                style={{ color: 'var(--accent)' }}
              >
                info@zoni-heritage.jp
              </a>
            </p>
            <p className="text-xs opacity-70">※ 今後、専用のお問い合わせフォームを設置予定です。</p>
          </div>
        </section>

        <p>
          お問い合わせにあたっては、
          <Link href="/terms" className="underline mx-1" style={{ color: 'var(--accent)' }}>
            利用規約
          </Link>
          および
          <Link href="/privacy" className="underline mx-1" style={{ color: 'var(--accent)' }}>
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
      </div>
    </div>
  )
}
