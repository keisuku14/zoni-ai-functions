export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1
        className="text-2xl font-bold mb-8 text-center"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        利用規約
      </h1>
      <div
        className="rounded-xl p-8 space-y-6 text-sm leading-relaxed"
        style={{ backgroundColor: '#f5efe6', border: '2px solid var(--border)', color: 'var(--text)' }}
      >
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第1条（適用）</h2>
          <p>本規約は、雑煮文化遺産（ZONI HERITAGE）（以下「当サイト」）が提供する すべてのサービスの利用に関し、ユーザーと当サイトとの間に適用されます。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第2条（サービス内容）</h2>
          <p>当サイトは、日本各地の雑煮文化を記録・共有・保存することを目的とし、ユーザーが雑煮に関する文章・画像等を投稿・閲覧できるサービスを提供します。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第3条（登録・アカウント管理）</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>登録情報は正確かつ最新の内容としてください。</li>
            <li>アカウント管理責任はユーザー本人に帰属します。</li>
            <li>規約違反や不正利用が確認された場合、事前通知なく利用停止等を行うことがあります。</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第4条（投稿内容について）</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>投稿できるのは、ユーザー自身が権利を有する内容に限ります。</li>
            <li>第三者の権利（著作権・肖像権・プライバシー等）を侵害する投稿は禁止します。</li>
            <li>誹謗中傷、公序良俗に反する内容、当サイトの趣旨に反する投稿は禁止します。</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第5条（不適切な投稿への対応）</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>規約違反と判断された投稿は、事前通知なく削除される場合があります。</li>
            <li>複数回の違反が確認された場合、アカウント停止または退会処分とすることがあります。</li>
            <li>削除・退会処分の理由について、当サイトは説明義務を負いません。</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第6条（投稿内容の利用）</h2>
          <p className="mb-2">ユーザーは、投稿した内容について、以下の目的で当サイトが無償・非独占的に利用することを許諾します。</p>
          <ul className="list-disc list-inside space-y-1">
            <li>当サイト内での掲載・編集・分類</li>
            <li>SNS、広報資料、展示、研究・記録目的での紹介</li>
            <li>雑煮文化の保存・継承・調査研究</li>
          </ul>
          <p className="mt-2">投稿者個人が特定される形での利用や取材・詳細インタビューを行う場合は、事前に本人の同意を得ます。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第7条（AI解析について）</h2>
          <p>当サイトは、投稿内容をAI等の技術により解析・構造化する場合があります。これは検索性向上・表示改善・文化的整理を目的とするものです。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第8条（連絡について）</h2>
          <p className="mb-2">以下の目的に限り、登録されたメールアドレスへ連絡する場合があります。</p>
          <ul className="list-disc list-inside space-y-1">
            <li>投稿内容の確認</li>
            <li>雑煮文化に関する取材・詳細インタビューの依頼</li>
            <li>運営上の重要なお知らせ</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第9条（免責事項）</h2>
          <p>当サイトは、投稿内容の正確性・完全性を保証するものではなく、利用により生じた損害について一切の責任を負いません。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2" style={{ color: 'var(--accent)' }}>第10条（準拠法・管轄）</h2>
          <p>本規約は日本法を準拠法とし、当サイトに関する紛争は日本の裁判所を専属的合意管轄とします。</p>
        </section>
        <p className="text-xs opacity-60 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          制定日：2026年1月9日
        </p>
      </div>
    </div>
  )
}
