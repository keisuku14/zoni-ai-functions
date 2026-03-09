import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: '雑煮文化遺産 | ZONI HERITAGE',
  description: '日本各地で受け継がれてきた「お雑煮」の文化アーカイブ。地域ごとの雑煮を投稿・記録・共有するプロジェクトです。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="washi-bg min-h-screen flex flex-col">
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
