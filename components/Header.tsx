'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, loading, signInWithGoogle, logout } = useAuth()

  return (
    <header style={{ backgroundColor: 'var(--header)' }} className="px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-white">
          <div className="text-lg font-bold" style={{ fontFamily: 'serif' }}>雑煮文化遺産</div>
          <div className="text-xs tracking-widest opacity-70">ZONI HERITAGE</div>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white">
          <Link href="/zoni/list" className="hover:opacity-70 transition">一覧</Link>
          <span className="opacity-40 line-through">統計・傾向（Coming Soon）</span>
          <Link href="/zoni/new" className="hover:opacity-70 transition">投稿</Link>
        </nav>

        {/* 右側：ログイン状態 */}
        <div className="hidden md:flex items-center gap-2">
          {loading ? null : user ? (
            <>
              <span className="text-white text-sm opacity-70">
                {user.displayName ?? user.email} さん
              </span>
              <Link
                href="/mypage"
                className="text-sm px-4 py-1.5 rounded border border-white text-white hover:bg-white hover:text-amber-900 transition"
              >
                マイページ
              </Link>
              <button
                onClick={logout}
                className="text-sm px-4 py-1.5 rounded text-white transition"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                ログアウト
              </button>
            </>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="text-sm px-4 py-1.5 rounded border border-white text-white hover:bg-white hover:text-amber-900 transition"
            >
              ログインして投稿・編集
            </button>
          )}
        </div>

        {/* ハンバーガー（モバイル） */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? '×' : '≡'}
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden mt-3 border-t border-white/20 pt-3 flex flex-col gap-3 text-sm">
          <Link href="/zoni/list" onClick={() => setMenuOpen(false)} className="text-white hover:opacity-70">一覧</Link>
          <span className="text-white opacity-40">統計・傾向（Coming Soon）</span>
          <Link href="/zoni/new" onClick={() => setMenuOpen(false)} className="text-white hover:opacity-70">投稿</Link>
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/mypage" onClick={() => setMenuOpen(false)} className="text-white hover:opacity-70">
                    マイページ
                  </Link>
                  <button onClick={logout} className="text-left text-white hover:opacity-70">
                    ログアウト
                  </button>
                </>
              ) : (
                <button onClick={signInWithGoogle} className="text-left text-white hover:opacity-70">
                  ログインして投稿・編集
                </button>
              )}
            </>
          )}
        </div>
      )}
    </header>
  )
}
