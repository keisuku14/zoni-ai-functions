'use client'

import { useState, useRef } from 'react'
import { ZoniPost } from '@/types/zoni'
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

type Props = {
  initialData?: Partial<ZoniPost>
  onSubmit: (data: Partial<ZoniPost>, aiOverwritten: boolean) => Promise<void>
  submitLabel?: string
}

const SOUP_OPTIONS = ['醤油', '味噌', '白味噌', 'すまし', '塩', '鶏ガラ', '魚だし', 'あごだし', 'その他']
const MOCHI_OPTIONS = ['角餅', '丸餅', '焼き餅', '煮餅', 'その他']
const REGION_OPTIONS = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
  '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export default function ZoniForm({ initialData = {}, onSubmit, submitLabel = '保存する' }: Props) {
  const [familyName, setFamilyName] = useState(initialData.familyName ?? '')
  const [description, setDescription] = useState(initialData.description ?? '')
  const [detailedRecipe, setDetailedRecipe] = useState(initialData.detailedRecipe ?? '')
  const [postalCode, setPostalCode] = useState(initialData.postalCode ?? '')
  const [regionCurrent, setRegionCurrent] = useState(initialData.regionCurrent ?? '')
  const [regionRoot, setRegionRoot] = useState(initialData.regionRoot ?? '')
  const [rootPrefecture, setRootPrefecture] = useState('')
  const [geo, setGeo] = useState(initialData.geo ?? null)
  const [parsed, setParsed] = useState(initialData.parsed ?? null)
  const [aiOverwritten, setAiOverwritten] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [postalLoading, setPostalLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(initialData.imageUrl ?? '')
  const [imageUploading, setImageUploading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 画像選択
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  // 画像アップロード
  const uploadImage = async (postId: string): Promise<string | null> => {
    if (!imageFile) return imagePreview || null
    setImageUploading(true)
    try {
      const storageRef = ref(storage, `zoni/${postId}/${Date.now()}_${imageFile.name}`)
      await uploadBytes(storageRef, imageFile)
      const url = await getDownloadURL(storageRef)
      return url
    } catch (e) {
      console.error('画像アップロード失敗:', e)
      return null
    } finally {
      setImageUploading(false)
    }
  }

  // 郵便番号→地域解決
  const handlePostalResolve = async () => {
    if (!postalCode) return
    setPostalLoading(true)
    try {
      const res = await fetch('/api/resolve-postal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postalCode }),
      })
      const data = await res.json()
      if (data.regionCurrent) setRegionCurrent(data.regionCurrent)
      if (data.regionRoot) setRegionRoot(data.regionRoot)
      if (data.geo) setGeo(data.geo)
    } catch (e) {
      console.error(e)
      alert('郵便番号の解決に失敗しました')
    } finally {
      setPostalLoading(false)
    }
  }

  // AI解析
  const handleAiParse = async () => {
    if (!description) return
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await res.json()
      if (data.parsed) {
        setParsed(data.parsed)
        setAiOverwritten(true)
      }
    } catch (e) {
      console.error(e)
      alert('AI解析に失敗しました')
    } finally {
      setAiLoading(false)
    }
  }

  // 保存
  const handleSubmit = async () => {
    if (!familyName || !description) {
      alert('家族名と雑煮の説明は必須です')
      return
    }
    if (!agreed) {
      alert('利用規約とプライバシーポリシーに同意してください')
      return
    }
    setSaving(true)
    try {
      const tempId = Date.now().toString()
      const imageUrl = await uploadImage(tempId)

      const data: Partial<ZoniPost> = {
        familyName,
        description,
        detailedRecipe,
        postalCode,
        regionCurrent,
        regionRoot,
        ...(geo && { geo }),
        ...(parsed && { parsed }),
        ...(imageUrl && { imageUrl }),
      }
      await onSubmit(data, aiOverwritten)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2"
  const inputStyle = { borderColor: 'var(--border)', backgroundColor: 'white', color: 'var(--text)' }
  const labelStyle = { color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }

  return (
    <div
      className="rounded-xl border-4 p-6 space-y-6"
      style={{ borderColor: 'var(--accent)', backgroundColor: '#1a1a1a' }}
    >
      {/* 家族名 */}
      <div>
        <label className="block mb-1" style={labelStyle}>家族名</label>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="例：○○家"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* 雑煮の説明 */}
      <div>
        <label className="block mb-1" style={labelStyle}>雑煮の説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="スープ・餅・具材・ルーツの説明など（例：鶏ガラの醤油味で、角餅を焼かずに煮ます。福岡の父方の祖父のレシピがルーツです。）"
          rows={5}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* AIプレビュー */}
      <div
        className="rounded-lg p-4 border"
        style={{ backgroundColor: '#fdf3ec', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-sm" style={{ color: 'var(--accent)' }}>AIプレビュー</p>
          <button
            onClick={handleAiParse}
            disabled={aiLoading || !description}
            className="text-xs px-3 py-1 rounded border transition disabled:opacity-50"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            {aiLoading ? '解析中...' : '再解析'}
          </button>
        </div>
        <p className="text-xs mb-2 opacity-60" style={{ color: 'var(--text)' }}>
          ※この記載の内容が保存されます。記載内容がおかしい場合は↑の記載方法を変更してください。
        </p>
        {parsed ? (
          <div className="text-sm space-y-1" style={{ color: 'var(--text)' }}>
            <p>スープ：{parsed.soupBase ?? '不明'}</p>
            <p>餅タイプ：{parsed.mochiType ?? '不明'}</p>
            <p>具材：{parsed.ingredients?.join('・') ?? 'なし'}</p>
          </div>
        ) : (
          <div className="text-sm space-y-1 opacity-40" style={{ color: 'var(--text)' }}>
            <p className="font-bold">要点サマリー</p>
            <p>入力待ち</p>
          </div>
        )}
      </div>

      {/* 郵便番号 */}
      <div>
        <label className="block mb-1" style={labelStyle}>現住所の郵便番号</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="ハイフンなし（例：1500001）"
            className={inputClass}
            style={inputStyle}
          />
          <button
            onClick={handlePostalResolve}
            disabled={postalLoading || !postalCode}
            className="text-sm px-4 py-2 rounded whitespace-nowrap transition disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            {postalLoading ? '検索中' : '取得'}
          </button>
        </div>
        {regionCurrent && (
          <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
            📍 {regionRoot} / {regionCurrent}
          </p>
        )}
      </div>

      {/* ルーツ都道府県 */}
      <div>
        <label className="block mb-1" style={labelStyle}>ルーツ都道府県</label>
        <select
          value={rootPrefecture}
          onChange={(e) => setRootPrefecture(e.target.value)}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">選択してください</option>
          {REGION_OPTIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* 画像アップロード */}
      <div>
        <label className="block mb-1" style={labelStyle}>雑煮の写真</label>
        <div
          className="border rounded px-4 py-3"
          style={{ borderColor: 'var(--border)', backgroundColor: 'white' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>
        {imagePreview && (
          <div className="mt-2 relative w-full h-48 rounded overflow-hidden">
            <img
              src={imagePreview}
              alt="プレビュー"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* 詳細レシピ */}
      <div>
        <label className="block mb-1" style={labelStyle}>詳細レシピ</label>
        <textarea
          value={detailedRecipe}
          onChange={(e) => setDetailedRecipe(e.target.value)}
          placeholder="材料（指定のメーカー等）・分量・作り方などを自由に"
          rows={4}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* 同意チェック */}
      <div className="flex items-start gap-2 text-sm" style={{ color: 'white' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          <a href="/terms" className="underline" style={{ color: 'var(--accent)' }}>利用規約</a>
          と
          <a href="/privacy" className="underline" style={{ color: 'var(--accent)' }}>プライバシーポリシー</a>
          に同意します
        </span>
      </div>

      {/* 保存ボタン */}
      <button
        onClick={handleSubmit}
        disabled={saving || imageUploading}
        className="w-full py-3 rounded font-bold text-lg transition disabled:opacity-50"
        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
      >
        {imageUploading ? '画像アップロード中...' : saving ? '保存中...' : submitLabel}
      </button>
    </div>
  )
}
