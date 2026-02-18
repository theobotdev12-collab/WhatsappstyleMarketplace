"use client"

import { useState, useRef } from "react"
import {
  X,
  Camera,
  ChevronRight,
  ChevronLeft,
  ImagePlus,
  Tag,
  DollarSign,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { mockCategories } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

interface SellProductDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (product: Product) => void
}

type Step = "photos" | "details" | "review"

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
]

const sellableCategories = mockCategories.filter((c) => c.id !== "all")

export function SellProductDialog({ open, onClose, onSubmit }: SellProductDialogProps) {
  const [step, setStep] = useState<Step>("photos")
  const [photos, setPhotos] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState<"new" | "like-new" | "good" | "fair">("new")
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const conditions = [
    { value: "new" as const, label: "New" },
    { value: "like-new" as const, label: "Like New" },
    { value: "good" as const, label: "Good" },
    { value: "fair" as const, label: "Fair" },
  ]

  const resetForm = () => {
    setStep("photos")
    setPhotos([])
    setTitle("")
    setPrice("")
    setDescription("")
    setCategory("")
    setCondition("new")
    setSubmitted(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const addPlaceholderPhoto = () => {
    if (photos.length < 6) {
      const available = PLACEHOLDER_IMAGES.filter((img) => !photos.includes(img))
      if (available.length > 0) {
        setPhotos((prev) => [...prev, available[0]])
      }
    }
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const canProceedFromPhotos = photos.length >= 1
  const canProceedFromDetails = title.trim() && price && category
  const priceNumber = parseFloat(price) || 0

  const handleSubmit = () => {
    const newProduct: Product = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      price: priceNumber,
      currency: "USD",
      image: photos[0],
      rating: 0,
      reviewCount: 0,
      category,
      seller: {
        name: "Jamie Walker",
        avatar: "https://i.pravatar.cc/48?img=68",
      },
    }
    onSubmit(newProduct)
    setSubmitted(true)
  }

  if (!open) return null

  const stepIndex = step === "photos" ? 0 : step === "details" ? 1 : 2
  const steps: { key: Step; label: string }[] = [
    { key: "photos", label: "Photos" },
    { key: "details", label: "Details" },
    { key: "review", label: "Review" },
  ]

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-whatsapp-teal px-4 py-3">
        <button onClick={handleClose} className="text-white" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-base font-bold text-white">
          {submitted ? "Listed!" : "Sell a Product"}
        </h2>
        <div className="w-5" />
      </div>

      {/* Step Indicator */}
      {!submitted && (
        <div className="flex items-center gap-0 bg-card px-4 py-3">
          {steps.map((s, i) => (
            <div key={s.key} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i <= stepIndex
                      ? "bg-whatsapp-green text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-[10px] font-medium sm:text-xs ${
                    i <= stepIndex ? "text-whatsapp-green" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mt-[-16px] h-0.5 w-full ${
                    i < stepIndex ? "bg-whatsapp-green" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* SUCCESS STATE */}
        {submitted && (
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-whatsapp-green/10">
              <CheckCircle2 className="h-10 w-10 text-whatsapp-green" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-card-foreground">
              Product Listed
            </h3>
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Your item is now visible to buyers in the marketplace.
            </p>
            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-xl bg-card shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[0]}
                alt={title}
                className="aspect-video w-full object-cover"
              />
              <div className="p-3">
                <h4 className="text-sm font-semibold text-card-foreground">{title}</h4>
                <p className="text-lg font-bold text-whatsapp-green">
                  ${priceNumber.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="mt-8 w-full max-w-xs rounded-full bg-whatsapp-green py-3 text-center text-sm font-bold text-white transition-colors hover:bg-whatsapp-green-dark"
            >
              Done
            </button>
          </div>
        )}

        {/* STEP 1: PHOTOS */}
        {!submitted && step === "photos" && (
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Camera className="h-5 w-5 text-whatsapp-green" />
              <h3 className="text-sm font-bold text-card-foreground">
                Add Photos
              </h3>
              <span className="text-xs text-muted-foreground">
                ({photos.length}/6)
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Add up to 6 photos. The first photo will be the cover image.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`Product photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 rounded bg-whatsapp-green px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Cover
                    </span>
                  )}
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/70 text-background opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove photo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {photos.length < 6 && (
                <button
                  onClick={addPlaceholderPhoto}
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-whatsapp-divider text-muted-foreground transition-colors hover:border-whatsapp-green hover:text-whatsapp-green"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-[10px] font-medium">Add</span>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              aria-hidden="true"
            />
          </div>
        )}

        {/* STEP 2: DETAILS */}
        {!submitted && step === "details" && (
          <div className="p-4">
            <div className="flex flex-col gap-4">
              {/* Title */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-card-foreground">
                  <Tag className="h-3.5 w-3.5 text-whatsapp-green" />
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Wireless Headphones"
                  maxLength={80}
                  className="w-full rounded-lg border border-whatsapp-divider bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-whatsapp-green focus:outline-none focus:ring-1 focus:ring-whatsapp-green"
                />
                <span className="mt-1 block text-right text-[10px] text-muted-foreground">
                  {title.length}/80
                </span>
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-card-foreground">
                  <DollarSign className="h-3.5 w-3.5 text-whatsapp-green" />
                  Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-whatsapp-divider bg-card py-2.5 pl-7 pr-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-whatsapp-green focus:outline-none focus:ring-1 focus:ring-whatsapp-green"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 text-xs font-semibold text-card-foreground">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {sellableCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        category === cat.id
                          ? "bg-whatsapp-green text-white"
                          : "bg-secondary text-card-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="mb-1.5 text-xs font-semibold text-card-foreground">
                  Condition
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCondition(c.value)}
                      className={`rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                        condition === c.value
                          ? "bg-whatsapp-green text-white"
                          : "bg-secondary text-card-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-card-foreground">
                  <FileText className="h-3.5 w-3.5 text-whatsapp-green" />
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item, mention key features, flaws, etc."
                  rows={3}
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-whatsapp-divider bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-whatsapp-green focus:outline-none focus:ring-1 focus:ring-whatsapp-green"
                />
                <span className="mt-1 block text-right text-[10px] text-muted-foreground">
                  {description.length}/500
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {!submitted && step === "review" && (
          <div className="p-4">
            <h3 className="mb-4 text-sm font-bold text-card-foreground">
              Review your listing
            </h3>

            {/* Preview Card */}
            <div className="overflow-hidden rounded-xl bg-card shadow-sm">
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[0]}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                {photos.length > 1 && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-foreground/60 px-2 py-0.5 text-xs font-medium text-background">
                    +{photos.length - 1} more
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="mb-1 text-base font-bold text-card-foreground">
                  {title}
                </h4>
                <p className="mb-3 text-xl font-bold text-whatsapp-green">
                  ${priceNumber.toFixed(2)}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-card-foreground">
                    {sellableCategories.find((c) => c.id === category)?.label || category}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-card-foreground">
                    {conditions.find((c) => c.value === condition)?.label}
                  </span>
                </div>

                {description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.pravatar.cc/48?img=68"
                alt="Your avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-card-foreground">Jamie Walker</p>
                <p className="text-xs text-muted-foreground">Seller</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      {!submitted && (
        <div className="flex items-center gap-3 border-t border-whatsapp-divider bg-card px-4 py-3">
          {step !== "photos" && (
            <button
              onClick={() => setStep(step === "review" ? "details" : "photos")}
              className="flex items-center gap-1 rounded-full border border-whatsapp-divider px-4 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <div className="flex-1" />
          {step === "photos" && (
            <button
              onClick={() => setStep("details")}
              disabled={!canProceedFromPhotos}
              className="flex items-center gap-1 rounded-full bg-whatsapp-green px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-green-dark disabled:opacity-40 disabled:hover:bg-whatsapp-green"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {step === "details" && (
            <button
              onClick={() => setStep("review")}
              disabled={!canProceedFromDetails}
              className="flex items-center gap-1 rounded-full bg-whatsapp-green px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-green-dark disabled:opacity-40 disabled:hover:bg-whatsapp-green"
            >
              Review
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {step === "review" && (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1 rounded-full bg-whatsapp-green px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-green-dark"
            >
              <CheckCircle2 className="h-4 w-4" />
              List Product
            </button>
          )}
        </div>
      )}
    </div>
  )
}
