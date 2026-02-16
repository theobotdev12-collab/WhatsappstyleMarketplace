export interface Chat {
  id: string
  type: "direct" | "group"
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unreadCount: number
  hasProduct?: boolean
}

export interface ProductCardInChatProps {
  productId: string
  title: string
  price: number
  currency: string
  image: string
  seller: { name: string; avatar: string }
  onTap: () => void
}

export interface Product {
  id: string
  title: string
  price: number
  currency: string
  image: string
  rating: number
  reviewCount: number
  category: string
  seller: { name: string; avatar: string }
}

export interface Category {
  id: string
  label: string
  icon: string
}
