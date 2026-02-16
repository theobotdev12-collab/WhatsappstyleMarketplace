"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 border border-whatsapp-divider">
      <Search className="h-4 w-4 flex-shrink-0 text-whatsapp-text-secondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-card-foreground placeholder:text-whatsapp-text-secondary focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-whatsapp-text-secondary hover:text-card-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
