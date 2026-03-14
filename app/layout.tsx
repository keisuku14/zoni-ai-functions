import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: '雑煮文化遺産 | ZONI HERITAGE',
  description: '日本各地で受け継がれてきた「お雑煮」の文化アーカイブ。地域ごとの雑煮を投稿・記録・共有するプロジェクトです。',
  keywords: ['雑煮', 'お雑煮', '正月', '日本文化', '郷土料理', '文化遺産', 'ZONI HERITAGE'],
  authors: [{ name: '雑煮文化遺産プロジェクト' }],
  openGraph: {
    title: '雑煮文化遺産 | ZONI HERITAGE',
    description: '日本各地で受け継がれてきた「お雑煮」の文化アーカイブ。地域ごとの雑煮を投稿・記録・共有するプロジェクトです。',
    url: 'https://zoni-heritage.jp',
    siteName: '雑煮文化遺産',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '雑煮文化遺産 | ZONI HERITAGE',
    description: '日本各地で受け継がれてきた「お雑煮」の文化アーカイブ。',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
