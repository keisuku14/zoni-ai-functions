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

    // 都道府県
    const prefecture =
      components.find((c: any) => c.types.includes('administrative_area_level_1'))?.long_name ?? ''

    // 市区町村
    const locality =
      components.find((c: any) => c.types.includes('locality'))?.long_name ??
      components.find((c: any) => c.types.includes('administrative_area_level_2'))?.long_name ??
      ''

    // 区（東京23区など）
    const sublocality1 =
      components.find((c: any) => c.types.includes('sublocality_level_1'))?.long_name ?? ''

    // 町名
    const sublocality2 =
      components.find((c: any) => c.types.includes('sublocality_level_2'))?.long_name ?? ''

    // regionCurrentを組み立て：都道府県＋市区町村＋区＋町名
    const parts = [prefecture, locality, sublocality1, sublocality2].filter(Boolean)
    // 重複除去（例：東京都・東京都が連続する場合）
    const regionCurrent = parts.filter((v, i) => parts.indexOf(v) === i).join('')

    return NextResponse.json({
      regionCurrent,
      prefecture,
      regionRoot: prefecture, // regionRootは都道府県名をそのまま返す
      geo: { lat: geo.lat, lng: geo.lng },
    })
  } catch (e) {
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}
