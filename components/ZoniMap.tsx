'use client'

import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import { ZoniPost } from '@/types/zoni'
import Link from 'next/link'

type Props = {
  posts: ZoniPost[]
}

export default function ZoniMap({ posts }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  const [selectedPost, setSelectedPost] = useState<ZoniPost | null>(null)

  const mappablePosts = posts.filter((p) => p.geo?.lat && p.geo?.lng)

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ width: '100%', height: '350px' }}>
        <Map
          defaultCenter={{ lat: 36.5, lng: 136.0 }}
          defaultZoom={5}
          mapId="zoni-map"
          gestureHandling="greedy"
          onClick={() => setSelectedPost(null)}
        >
          {mappablePosts.map((post) => (
            <AdvancedMarker
              key={post.id}
              position={{ lat: post.geo!.lat, lng: post.geo!.lng }}
              onClick={() => setSelectedPost(post)}
              title={post.familyName}
            >
              <Pin
                background="#b5451b"
                borderColor="#2c1a0e"
                glyphColor="white"
              />
            </AdvancedMarker>
          ))}

          {/* 吹き出し */}
          {selectedPost && selectedPost.geo && (
            <InfoWindow
              position={{ lat: selectedPost.geo.lat, lng: selectedPost.geo.lng }}
              onCloseClick={() => setSelectedPost(null)}
            >
              <div style={{ maxWidth: '200px', fontFamily: 'serif' }}>
                {/* 画像 */}
                {selectedPost.imageUrl && (
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.familyName}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }}
                  />
                )}
                {/* 家名 */}
                <p style={{ fontWeight: 'bold', color: '#3d1f0d', marginBottom: '4px' }}>
                  {selectedPost.familyName}
                </p>
                {/* 地域 */}
                {selectedPost.regionCurrent && (
                  <p style={{ fontSize: '11px', color: '#b5451b', marginBottom: '4px' }}>
                    📍 {selectedPost.regionCurrent}
                  </p>
                )}
                {/* タグ */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  {selectedPost.soupBase && (
                    <span style={{ fontSize: '10px', backgroundColor: '#e8d5bc', padding: '2px 6px', borderRadius: '4px', color: '#3d1f0d' }}>
                      {selectedPost.soupBase}
                    </span>
                  )}
                  {selectedPost.mochiType && (
                    <span style={{ fontSize: '10px', backgroundColor: '#e8d5bc', padding: '2px 6px', borderRadius: '4px', color: '#3d1f0d' }}>
                      {selectedPost.mochiType}
                    </span>
                  )}
                </div>
                {/* 説明 */}
                <p style={{ fontSize: '11px', color: '#3d1f0d', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {selectedPost.description}
                </p>
                {/* 詳細リンク */}
                <Link
                  href={`/zoni/${selectedPost.id}`}
                  style={{ fontSize: '11px', color: '#b5451b', textDecoration: 'underline' }}
                >
                  詳細を見る →
                </Link>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  )
}
