export interface Product {
  id: string
  name: string
  price: number
  color: string
}

export interface CategoryButton {
  id: CategoryId
  icon: string
  title: string
  description: string
  color: string
  itemCount: number
}

export const CATEGORY_IDS = [
  'breakfast',
  'soups',
  'pasta',
  'sushi',
  'main-course',
  'desserts',
  'drinks',
  'alcohol',
] as const

export type CategoryId = typeof CATEGORY_IDS[number]

export type ProductCategory = Record<CategoryId, Product[]>
