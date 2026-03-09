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
  "soupBase": "醤油 or 味噌 or 塩 or すまし or null",
  "mochiType": "角餅 or 丸餅 or null",
  "ingredients": ["具材1", "具材2", ...]
}

判断できない場合はnullにしてください。`,
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

    // JSONパース（```json ブロックが含まれる場合も対応）
    const cleaned = content.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json({ parsed })
  } catch (e) {
    console.error('AI parse error:', e)
    return NextResponse.json({ error: 'AI解析に失敗しました' }, { status: 500 })
  }
}
