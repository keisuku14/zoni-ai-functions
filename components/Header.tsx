'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

const gold = '#c9a84c'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { user, loading, signInWithGoogle, logout } = useAuth()

  // 外クリックで閉じる
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <header style={{ backgroundColor: 'var(--header)' }} className="px-6 py-3 relative z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          {/* ロゴ */}
          <Link href="/" className="shrink-0">
            <div className="text-lg font-bold" style={{ fontFamily: 'serif', color: gold }}>雑煮文化遺産</div>
            <div className="text-xs tracking-widest" style={{ color: gold, opacity: 0.8 }}>ZONI HERITAGE</div>
          </Link>

          {/* md以上：ナビ */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/zoni/list" className="hover:opacity-70 transition" style={{ color: gold }}>一覧</Link>
            <span style={{ color: gold, opacity: 0.4 }} className="line-through">統計・傾向（Coming Soon）</span>
            <Link href="/zoni/new" className="hover:opacity-70 transition" style={{ color: gold }}>投稿</Link>
          </nav>

          {/* 右側 */}
          <div className="flex items-center gap-2">

            {/* lg以上：フルユーザーメニュー */}
            <div className="hidden lg:flex items-center gap-2">
              {loading ? null : user ? (
                <>
                  <span className="text-sm opacity-70" style={{ color: gold }}>
                    {user.displayName ?? user.email} さん
                  </span>
                  <Link
                    href="/mypage"
                    className="text-sm px-4 py-1.5 rounded transition hover:opacity-80"
                    style={{ border: `1px solid ${gold}`, color: gold }}
                  >
                    マイページ
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm px-4 py-1.5 rounded text-white transition hover:opacity-80"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="text-sm px-4 py-1.5 rounded transition hover:opacity-80"
                  style={{ border: `1px solid ${gold}`, color: gold }}
                >
                  ログインして投稿・編集
                </button>
              )}
            </div>

            {/* md〜lg：人型アイコン */}
            <div className="hidden md:flex lg:hidden relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-2xl px-2 py-1 rounded transition hover:opacity-70"
                style={{ color: gold }}
                title="ユーザーメニュー"
              >
                👤
              </button>

              {/* 右スライドパネル */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-10 w-56 rounded-lg shadow-xl py-3 px-4 flex flex-col gap-3 text-sm z-50"
                  style={{ backgroundColor: 'var(--header)', border: `1px solid ${gold}44` }}
                >
                  {loading ? null : user ? (
                    <>
                      <p className="text-xs opacity-60 border-b pb-2" style={{ color: gold, borderColor: `${gold}44` }}>
                        {user.displayName ?? user.email}
                      </p>
                      <Link
                        href="/mypage"
                        onClick={() => setUserMenuOpen(false)}
                        className="hover:opacity-70 transition"
                        style={{ color: gold }}
                      >
                        👤 マイページ
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="text-left hover:opacity-70 transition"
                        style={{ color: gold }}
                      >
                        🚪 ログアウト
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { signInWithGoogle(); setUserMenuOpen(false) }}
                      className="text-left hover:opacity-70 transition"
                      style={{ color: gold }}
                    >
                      🔑 ログインして投稿・編集
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* md未満：ハンバーガー */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl"
              style={{ color: gold }}
            >
              {menuOpen ? '×' : '≡'}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {menuOpen && (
          <div
            className="md:hidden mt-3 pt-3 flex flex-col gap-3 text-sm"
            style={{ borderTop: `1px solid ${gold}33` }}
          >
            <Link href="/zoni/list" onClick={() => setMenuOpen(false)} className="hover:opacity-70" style={{ color: gold }}>一覧</Link>
            <span style={{ color: gold, opacity: 0.4 }}>統計・傾向（Coming Soon）</span>
            <Link href="/zoni/new" onClick={() => setMenuOpen(false)} className="hover:opacity-70" style={{ color: gold }}>投稿</Link>
            {!loading && (
              <>
                {user ? (
                  <>
                    <span className="text-sm opacity-70" style={{ color: gold }}>
                      {user.displayName ?? user.email} さん
                    </span>
                    <Link href="/mypage" onClick={() => setMenuOpen(false)} className="hover:opacity-70" style={{ color: gold }}>
                      マイページ
                    </Link>
                    <button onClick={() => { logout(); setMenuOpen(false) }} className="text-left hover:opacity-70" style={{ color: gold }}>
                      ログアウト
                    </button>
                  </>
                ) : (
                  <button onClick={() => { signInWithGoogle(); setMenuOpen(false) }} className="text-left hover:opacity-70" style={{ color: gold }}>
                    ログインして投稿・編集
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </header>
    </>
  )
}
