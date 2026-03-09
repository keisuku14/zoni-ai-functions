import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { postalCode } = await req.json()

  if (!postalCode) {
    return NextResponse.json({ error: 'postalCode is required' }, { status: 400 })
  }

  const apiKey = process.env.GEOCODING_API_KEY
  const address = `日本 〒${postalCode}`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&language=ja&key=${apiKey}`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.status !== 'OK' || !data.results[0]) {
      return NextResponse.json({ error: '住所が見つかりませんでした' }, { status: 404 })
    }

    const result = data.results[0]
    const components = result.address_components
    const geo = result.geometry.location

    // 市区町村を取得
    const locality =
      components.find((c: any) => c.types.includes('locality'))?.long_name ||
      components.find((c: any) => c.types.includes('administrative_area_level_2'))?.long_name ||
      ''

    // 都道府県を取得
    const prefecture =
      components.find((c: any) => c.types.includes('administrative_area_level_1'))?.long_name || ''

    // regionRootのマッピング
    const regionRoot = getRegionRoot(prefecture)

    return NextResponse.json({
      regionCurrent: locality,
      prefecture,
      regionRoot,
      geo: { lat: geo.lat, lng: geo.lng },
    })
  } catch (e) {
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}

function getRegionRoot(prefecture: string): string {
  const map: Record<string, string> = {
    北海道: '北海道',
    青森県: '東北', 岩手県: '東北', 宮城県: '東北',
    秋田県: '東北', 山形県: '東北', 福島県: '東北',
    茨城県: '関東', 栃木県: '関東', 群馬県: '関東',
    埼玉県: '関東', 千葉県: '関東', 東京都: '関東', 神奈川県: '関東',
    新潟県: '中部', 富山県: '中部', 石川県: '中部',
    福井県: '中部', 山梨県: '中部', 長野県: '中部',
    岐阜県: '中部', 静岡県: '中部', 愛知県: '中部',
    三重県: '近畿', 滋賀県: '近畿', 京都府: '近畿',
    大阪府: '近畿', 兵庫県: '近畿', 奈良県: '近畿', 和歌山県: '近畿',
    鳥取県: '中国', 島根県: '中国', 岡山県: '中国',
    広島県: '中国', 山口県: '中国',
    徳島県: '四国', 香川県: '四国', 愛媛県: '四国', 高知県: '四国',
    福岡県: '九州', 佐賀県: '九州', 長崎県: '九州',
    熊本県: '九州', 大分県: '九州', 宮崎県: '九州',
    鹿児島県: '九州', 沖縄県: '沖縄',
  }
  return map[prefecture] || 'その他'
}
