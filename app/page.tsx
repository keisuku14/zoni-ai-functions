import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section className="washi-bg py-32 text-center border-b-4" style={{ borderColor: 'var(--accent)' }}>
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--accent)', fontFamily: 'serif' }}
        >
          全国の<br />雑煮文化を<br />未来へ
        </h1>
        <p className="text-lg mb-2" style={{ color: 'var(--text)' }}>
          みんなの「お雑煮」を記録し、伝統をつなぐアーカイブプロジェクト
        </p>
      </section>

      {/* 説明・CTAセクション */}
      <section className="washi-bg py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: 'var(--accent)', fontFamily: 'serif' }}
          >
            雑煮文化遺産
          </h2>
          <p className="leading-relaxed mb-10" style={{ color: 'var(--text)' }}>
            日本各地で受け継がれてきた「お雑煮」。その味、具材、作り方には、地域ごとの<br />
            風土と文化が息づいています。このアーカイブは、そんな多様な雑煮文化を未来へつなぐための<br />
            みんなの記録プロジェクトです。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link
              href="/zoni/list"
              className="px-10 py-4 rounded text-white font-bold text-lg transition hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              投稿データ一覧を見る
            </Link>
            <Link
              href="/zoni/new"
              className="px-10 py-4 rounded text-white font-bold text-lg transition hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              あなたの家の雑煮を投稿する
            </Link>
            <div
              className="px-10 py-4 rounded text-white font-bold text-lg opacity-50 cursor-not-allowed"
              style={{ backgroundColor: 'var(--border)' }}
            >
              統計・傾向（COMING SOON）
            </div>
          </div>

          <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.6 }}>
            新しい年の一椀に、古き良き日本の味を。
          </p>
        </div>
      </section>
    </div>
  )
}
