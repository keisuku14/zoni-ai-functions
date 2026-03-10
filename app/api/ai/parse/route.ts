import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { description } = await req.json()

  if (!description) {
    return NextResponse.json({ error: 'description is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `あなたは日本の雑煮の専門家です。
ユーザーの雑煮の説明文を解析し、以下のJSON形式のみで返してください。
説明文や前置きは一切不要です。JSONのみ出力してください。

{
  "text": "入力された説明文を元に、この雑煮を簡潔に説明する2〜3文の要点サマリー（日本語）",
  "soupBase": "スープの種類を自由記載（例：鶏ガラ醤油、白味噌、あごだし塩など）。不明な場合はnull",
  "soupType": "スープの特徴を自由記載（例：あっさり、こってり、甘めなど）。不明な場合はnull",
  "seasoning": "主な味付けを自由記載（例：醤油、味噌、塩など）。不明な場合はnull",
  "flavorNotes": "風味・特徴の一言メモ（例：鶏の旨みが凝縮された深い味わい）。不明な場合はnull",
  "mochiShape": "餅の形状のみ（丸餅 or 角餅 or null）",
  "mochiCooking": "餅の調理法のみ（焼く or 煮る or 両方 or null）",
  "ingredients": ["具材1", "具材2", ...],
  "toppings": ["トッピング1", ...]
}

判断できない場合はnullにしてください。ingredientsとtoppingsは空の場合は[]としてください。`,
          },
          {
            role: 'user',
            content: description,
          },
        ],
        temperature: 0.1,
      }),
    })

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: 'AI応答なし' }, { status: 500 })
    }

    const cleaned = content.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json({ parsed })
  } catch (e) {
    console.error('AI parse error:', e)
    return NextResponse.json({ error: 'AI解析に失敗しました' }, { status: 500 })
  }
}
