"use client"

import {
  LayoutGrid,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  BookOpen,
  Car,
  Gamepad2,
} from "lucide-react"
import type { Category } from "@/lib/types"

const iconMap: Record<string, React.ElementType> = {
  grid: LayoutGrid,
  smartphone: Smartphone,
  shirt: Shirt,
  home: Home,
  dumbbell: Dumbbell,
  "book-open": BookOpen,
  car: Car,
  "gamepad-2": Gamepad2,
}

interface CategoryCarouselProps {
  categories: Category[]
  activeCategory: string
  onSelect: (categoryId: string) => void
}

export function CategoryCarousel({
  categories,
  activeCategory,
  onSelect,
}: CategoryCarouselProps) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-3">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] || LayoutGrid
        const isActive = activeCategory === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-whatsapp-green text-white shadow-sm"
                : "bg-card text-card-foreground border border-whatsapp-divider hover:bg-secondary"
            }`}
          >
            <Icon className="h-4 w-4" />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
