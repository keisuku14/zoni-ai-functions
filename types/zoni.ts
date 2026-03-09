import { Timestamp } from 'firebase/firestore'

export interface ZoniPost {
  id?: string
  userId: string
  familyName: string
  description: string
  detailedRecipe?: string
  imageUrl?: string
  postalCode?: string
  regionCurrent?: string
  regionRoot?: string
  geo?: {
    lat: number
    lng: number
  }

  // 確定済みAI解析結果
  soupBase?: string
  mochiType?: string
  ingredients?: string[]

  // AI解析結果（未確定・仮置き）
  parsed?: {
    soupBase?: string
    mochiType?: string
    ingredients?: string[]
    analyzedAt?: Timestamp
    modelVersion?: string
  }

  yummyCount?: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
