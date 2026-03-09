import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ZoniPost } from '@/types/zoni'

// 投稿一覧をリアルタイム取得
export function subscribeZoniPosts(callback: (posts: ZoniPost[]) => void) {
  const q = query(collection(db, 'zoniPosts'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ZoniPost[]
    callback(posts)
  })
}

// 投稿1件取得
export async function getZoniPost(id: string): Promise<ZoniPost | null> {
  const ref = doc(db, 'zoniPosts', id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as ZoniPost
}

// 新規投稿
export async function createZoniPost(data: Omit<ZoniPost, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'zoniPosts'), {
    ...data,
    yummyCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

// 編集保存（yummyCount・createdAt・userIdは絶対触らない）
export async function updateZoniPost(
  id: string,
  data: Partial<Omit<ZoniPost, 'id' | 'yummyCount' | 'createdAt' | 'userId'>>
): Promise<void> {
  const ref = doc(db, 'zoniPosts', id)
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Yummyトグル（トランザクション）
export async function toggleYummy(postId: string, userId: string): Promise<void> {
  const postRef = doc(db, 'zoniPosts', postId)
  const yummyRef = doc(db, 'zoniPosts', postId, 'yummies', userId)

  await runTransaction(db, async (tx) => {
    const yummySnap = await tx.get(yummyRef)
    const postSnap = await tx.get(postRef)
    const current = postSnap.data()?.yummyCount ?? 0

    if (yummySnap.exists()) {
      tx.delete(yummyRef)
      tx.update(postRef, { yummyCount: Math.max(0, current - 1) })
    } else {
      tx.set(yummyRef, { createdAt: serverTimestamp() })
      tx.update(postRef, { yummyCount: current + 1 })
    }
  })
}
