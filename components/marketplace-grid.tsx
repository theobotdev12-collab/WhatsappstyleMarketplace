"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Plus, ShoppingBag } from "lucide-react"
import { CategoryCarousel } from "./category-carousel"
import { ProductCard } from "./product-card"
import { SearchBar } from "./search-bar"
import { mockCategories, mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

const ITEMS_PER_PAGE = 6

export function MarketplaceGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    setPage(1)
    const initial = filteredProducts.slice(0, ITEMS_PER_PAGE)
    setVisibleProducts(initial)
    setHasMore(initial.length < filteredProducts.length)
  }, [searchQuery, activeCategory]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(() => {
    const nextPage = page + 1
    const endIndex = nextPage * ITEMS_PER_PAGE
    const newProducts = filteredProducts.slice(0, endIndex)
    setVisibleProducts(newProducts)
    setPage(nextPage)
    setHasMore(endIndex < filteredProducts.length)
  }, [page, filteredProducts])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )
    const el = loaderRef.current
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasMore, loadMore])

  const handleProductTap = (productId: string) => {
    // In a real app, this would navigate to the product detail page
    console.log("Navigate to product:", productId)
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      {/* Header */}
      <div className="bg-whatsapp-teal px-4 py-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-white" />
          <h1 className="text-lg font-bold text-white">Marketplace</h1>
        </div>
        <div className="mt-2">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-whatsapp-divider bg-card">
        <CategoryCarousel
          categories={mockCategories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-whatsapp-text-secondary">
            <ShoppingBag className="mb-3 h-12 w-12" />
            <p className="text-sm font-medium">No products found</p>
            <p className="text-xs">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onTap={handleProductTap}
              />
            ))}
          </div>
        )}

        {/* Infinite scroll loader */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-6">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-whatsapp-green border-t-transparent" />
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-whatsapp-green px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-whatsapp-green-dark active:scale-95 sm:px-5 sm:py-3.5"
        aria-label="Add product"
      >
        <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-sm font-semibold sm:text-base">Sell</span>
      </button>
    </div>
  )
}
