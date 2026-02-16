"use client"

import { ArrowRight } from "lucide-react"
import type { ProductCardInChatProps } from "@/lib/types"

export function ProductCardChat({
  title,
  price,
  currency,
  image,
  seller,
  onTap,
}: ProductCardInChatProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price)

  return (
    <button
      onClick={onTap}
      className="group block w-[200px] overflow-hidden rounded-xl border border-whatsapp-divider bg-card text-left transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-card-foreground">
          {title}
        </h3>
        <span className="text-xl font-bold text-whatsapp-green">
          {formattedPrice}
        </span>
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={seller.avatar}
            alt={seller.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs text-whatsapp-text-secondary">
            {seller.name}
          </span>
        </div>
        <span className="mt-1 flex items-center gap-1 text-xs font-medium text-whatsapp-green transition-colors group-hover:text-whatsapp-green-dark">
          View Details
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  )
}
