"use client"

import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  onTap: (productId: string) => void
}

export function ProductCard({ product, onTap }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.price)

  return (
    <button
      onClick={() => onTap(product.id)}
      className="group flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight text-card-foreground">
          {product.title}
        </h3>
        <span className="text-lg font-bold text-whatsapp-green">
          {formattedPrice}
        </span>
        <div className="flex items-center gap-1">
          <div className="flex items-center" aria-label={`Rating: ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : i < product.rating
                      ? "fill-amber-400/50 text-amber-400"
                      : "text-whatsapp-divider"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-whatsapp-text-secondary">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </button>
  )
}
