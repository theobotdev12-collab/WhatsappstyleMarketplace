"use client"

import {
  Settings,
  Package,
  Heart,
  Star,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

type ThemeOption = "light" | "dark" | "system"

const themeOptions: { value: ThemeOption; label: string; icon: React.ElementType }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

const menuItems = [
  { icon: Package, label: "My Listings", count: 5 },
  { icon: Heart, label: "Favorites", count: 12 },
  { icon: Star, label: "Reviews", count: 8 },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help Center" },
]

export function ProfileTab() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background">
      {/* Header */}
      <div className="bg-whatsapp-teal px-4 pb-8 pt-4">
        <h1 className="mb-4 text-lg font-bold text-white">Profile</h1>
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/80?img=68"
            alt="Your profile"
            className="h-16 w-16 rounded-full border-2 border-white object-cover"
          />
          <div>
            <h2 className="text-base font-semibold text-white">Jamie Walker</h2>
            <p className="text-sm text-white/70">Active seller since 2024</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="-mt-4 mx-4 grid grid-cols-3 gap-3 rounded-xl bg-card p-4 shadow-sm">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-whatsapp-green">24</span>
          <span className="text-xs text-whatsapp-text-secondary">Sold</span>
        </div>
        <div className="flex flex-col items-center border-x border-whatsapp-divider">
          <span className="text-lg font-bold text-whatsapp-green">4.8</span>
          <span className="text-xs text-whatsapp-text-secondary">Rating</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-whatsapp-green">156</span>
          <span className="text-xs text-whatsapp-text-secondary">Buyers</span>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="mx-4 mt-4">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-whatsapp-text-secondary">
          Appearance
        </p>
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-card p-2">
          {themeOptions.map((opt) => {
            const Icon = opt.icon
            const isActive = mounted && theme === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex flex-col items-center gap-1.5 rounded-lg px-3 py-3 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-whatsapp-green text-white shadow-sm"
                    : "text-card-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Menu */}
      <div className="mt-4 flex-1 pb-4">
        <div className="mx-4 overflow-hidden rounded-xl bg-card">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/60 ${
                index < menuItems.length - 1
                  ? "border-b border-whatsapp-divider"
                  : ""
              }`}
            >
              <item.icon className="h-5 w-5 text-whatsapp-text-secondary" />
              <span className="flex-1 text-sm font-medium text-card-foreground">
                {item.label}
              </span>
              {item.count !== undefined && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-whatsapp-text-secondary">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mx-4 mt-4 overflow-hidden rounded-xl bg-card">
          <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/60">
            <LogOut className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
