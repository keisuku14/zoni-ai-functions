'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createZoniPost } from '@/lib/firestore'
import { ZoniPost } from '@/types/zoni'
import ZoniForm from '@/components/ZoniForm'

export default function NewZoniPage() {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()

  const handleSubmit = async (data: Partial<ZoniPost>, aiOverwritten: boolean) => {
    const payload: Omit<ZoniPost, 'id'> = {
      userId: user?.uid ?? 'anonymous',
      familyName: data.familyName ?? '',
      description: data.description ?? '',
      detailedRecipe: data.detailedRecipe ?? '',
      postalCode: data.postalCode ?? '',
      regionCurrent: data.regionCurrent ?? '',
      regionRoot: data.regionRoot ?? '',
      ...(data.geo && { geo: data.geo }),
      ...(data.parsed && { parsed: data.parsed }),
      ...(data.imageUrl && { imageUrl: data.imageUrl }),
      ...(aiOverwritten && data.parsed && {
        soupBase: data.parsed.soupBase,
        mochiType: data.parsed.mochiType,
        ingredients: data.parsed.ingredients,
      }),
    }
    const id = await createZoniPost(payload)
    router.push(`/zoni/${id}`)
  }

  // 未ログインの場合
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--accent)', fontFamily: 'serif' }}
        >
          投稿にはログインが必要です
        </h1>
        <p className="mb-8" style={{ color: 'var(--text)' }}>
          Googleアカウントでログインして、あなたの家の雑煮を投稿してください。
        </p>
        <button
          onClick={signInWithGoogle}
          className="px-8 py-3 rounded font-bold text-lg transition hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          Googleでログイン
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1
        className="text-2xl font-bold text-center mb-6"
        style={{ color: 'var(--accent)', fontFamily: 'serif' }}
      >
        おうちの雑煮データ投稿
      </h1>
      <ZoniForm
        onSubmit={handleSubmit}
        submitLabel="投稿する"
      />
    </div>
  )
}
