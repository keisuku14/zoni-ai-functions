import { getZoniPost } from '@/lib/firestore'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getZoniPost(params.id)
  if (!post) {
    return { title: '雑煮文化遺産' }
  }
  return {
    title: `${post.familyName}のお雑煮 | 雑煮文化遺産`,
    description: post.description ?? '雑煮文化遺産に投稿されたお雑煮です。',
    openGraph: {
      title: `${post.familyName}のお雑煮 | 雑煮文化遺産`,
      description: post.description ?? '',
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.familyName}のお雑煮 | 雑煮文化遺産`,
      description: post.description ?? '',
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }
}

export default function ZoniDetailLayout({ children }: Props) {
  return <>{children}</>
}
