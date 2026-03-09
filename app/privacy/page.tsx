export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1
        className="text-2xl font-bold mb-8 text-center"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        プライバシーポリシー
      </h1>
      <div
        className="rounded-xl p-8 space-y-6 text-sm leading-relaxed"
        style={{ backgroundColor: '#f5efe6', border: '2px solid var(--border)', color: 'var(--text)' }}
      >
        <p>雑煮文化遺産（ZONI HERITAGE）（以下「当サイト」）は、ユーザーの個人情報および投稿データを適切に取り扱うため、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。</p>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>1. 取得する情報</h2>
          <p className="font-bold mb-1">（1）アカウント情報</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>メールアドレス</li>
            <li>ユーザー識別子（Firebase Authentication により付与される UID）</li>
            <li>認証プロバイダ情報（Googleログイン等）</li>
          </ul>
          <p className="font-bold mb-1">（2）投稿・入力情報（公開されるもの）</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>投稿文化（説明文、詳細レシピ等）</li>
            <li>画像（雑煮の写真）</li>
            <li>地域情報（現住所の都道府県、ルーツ地域など）</li>
            <li>その他、ユーザーが入力した情報</li>
          </ul>
          <p className="text-xs opacity-70 mb-3">※投稿内容は、当サイト上で公開される場合があります（公開範囲は投稿画面等でご案内します）。</p>
          <p className="font-bold mb-1">（3）アクセス情報（自動取得）</p>
          <ul className="list-disc list-inside space-y-1">
            <li>IPアドレス、ブラウザ情報、端末情報</li>
            <li>Cookie 等の識別子</li>
            <li>アクセス日時、閲覧ページ、参照元 等</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>2. 利用目的</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>当サイトの提供・維持・改善のため</li>
            <li>ユーザー認証、本人確認、アカウント管理のため</li>
            <li>投稿データの保存・表示・編集・検索・分類のため</li>
            <li>投稿内容をAI等で解析し、構造化して表示するため</li>
            <li>不正利用防止・セキュリティ維持・利用規約違反への対応のため</li>
            <li>お問い合わせへの対応のため</li>
            <li>雑煮文化の記録・研究・紹介のため、投稿内容の背景やエピソード等について追加取材・インタビューをお願いする目的で、登録されたメールアドレス宛に連絡する場合があります。</li>
          </ol>
          <ul className="list-disc list-inside space-y-1 mt-2 text-xs opacity-70">
            <li>取材・インタビューへの協力は任意であり、ユーザーはこれを拒否できます</li>
            <li>取材・インタビュー内容を公開・利用する場合は、別途ユーザーの同意を得ます</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>3. 公開される情報と非公開情報</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>公開情報：投稿文章、画像、地域情報等（投稿ページ・一覧等に表示されるもの）</li>
            <li>原則非公開情報：メールアドレス、UID 等のアカウント情報</li>
          </ul>
          <p className="text-xs opacity-70 mt-2">※法令に基づく場合や、権利侵害対応等の必要がある場合はこの限りではありません。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>4. 第三者提供</h2>
          <p className="mb-2">当サイトは、以下の場合を除き、個人情報を第三者に提供しません。</p>
          <ul className="list-disc list-inside space-y-1">
            <li>ユーザー本人の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>不正行為・権利侵害への対応等、必要性が認められる場合</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>5. 外部サービスの利用（委託）</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Firebase (Google)：認証、Firestore、Storage、Hosting 等</li>
            <li>Google Maps (GA4)：アクセス解析</li>
            <li>OpenAI 等の AI サービス：投稿文章の解析</li>
          </ul>
          <p className="text-xs opacity-70 mt-2">※AI解析は投稿内容の整理・表示改善のために利用します。機微な個人情報の入力は推奨しません。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>6. Cookie・アクセス解析について</h2>
          <p>当サイトは、利便性向上やアクセス解析のため Cookie 等を利用することがあります。ブラウザ設定により Cookie を無効化できますが、一部機能が利用できない場合があります。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>7. 保存期間</h2>
          <p>当サイトは、利用目的に必要な期間、情報を保存します。アカウント削除や投稿削除等が行われた場合でも、技術上・運用上必要な範囲で一定期間保持する場合があります。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>8. 安全管理</h2>
          <p>当サイトは、情報の漏えい・滅失・毀損を防止するため、合理的な安全管理措置を講じます。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>9. ユーザーの権利</h2>
          <p>ユーザーは、当サイトが保有する自身の情報について、開示・訂正・削除等を求めることができます。希望がある場合は、下記お問い合わせ窓口までご連絡ください。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>10. 未成年の利用</h2>
          <p>未成年の方が当サイトを利用する場合、保護者の同意を得た上で利用してください。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>11. 本ポリシーの変更</h2>
          <p>本ポリシーは、必要に応じて変更されることがあります。変更後の内容は当サイト上に掲載した時点で効力を生じます。</p>
        </section>

        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>12. お問い合わせ窓口</h2>
          <p>当サイトの情報取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
          <p className="mt-2">
            <a href="mailto:info@zoni-heritage.jp" style={{ color: 'var(--accent)' }} className="underline">
              info@zoni-heritage.jp
            </a>
          </p>
        </section>

        <p className="text-xs opacity-60 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          制定日：2025年1月1日
        </p>
      </div>
    </div>
  )
}
