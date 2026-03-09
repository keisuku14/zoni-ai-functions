'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { subscribeZoniPosts } from '@/lib/firestore'
import { ZoniPost } from '@/types/zoni'

export default function Home() {
  const [images, setImages] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeZoniPosts((posts: ZoniPost[]) => {
      const urls = posts
        .filter((p) => p.imageUrl)
        .map((p) => p.imageUrl as string)
      const shuffled = urls.sort(() => Math.random() - 0.5)
      setImages(shuffled)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (images.length < 2) return
    const interval = setInterval(() => {
      // nextを表示開始（フェードイン）
      setShowNext(true)
      setTimeout(() => {
        // フェード完了後にcurrentをnextに切り替え
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setNextIndex((prev) => (prev + 1) % images.length)
        setShowNext(false)
      }, 1500)
    }, 4000)
    return () => clearInterval(interval)
  }, [images])

  return (
    <div>
      {/* ヒーローセクション */}
      <section
        className="relative py-32 text-center border-b-4 overflow-hidden"
        style={{ borderColor: 'var(--accent)', minHeight: '420px' }}
      >
        {/* 背景画像：current（常時表示） */}
        {images.length > 0 && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          />
        )}
        {/* 背景画像：next（フェードイン） */}
        {images.length > 1 && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1500"
            style={{
              backgroundImage: `url(${images[nextIndex]})`,
              opacity: showNext ? 1 : 0,
              transitionDuration: '1500ms',
            }}
          />
        )}

        {/* オーバーレイ */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(245, 239, 230, 0.45)' }}
        />

        {/* テキスト */}
        <div className="relative z-10 px-4">
          <div
            className="inline-block px-8 py-4 mb-4 rounded"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
          >
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              style={{ color: 'var(--accent)', fontFamily: 'serif' }}
            >
              全国の<br />雑煮文化を<br />未来へ
            </h1>
          </div>
          <br />
          <div
            className="inline-block px-6 py-2 rounded max-w-sm md:max-w-lg"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
          >
            <p className="text-base md:text-lg" style={{ color: 'var(--text)' }}>
              みんなの「お雑煮」を記録し、伝統をつなぐアーカイブプロジェクト
            </p>
          </div>
        </div>
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
