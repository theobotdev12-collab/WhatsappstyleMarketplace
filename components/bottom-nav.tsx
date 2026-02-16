"use client"

import { MessageCircle, ShoppingBag, User } from "lucide-react"

export type TabId = "chats" | "marketplace" | "profile"

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  unreadChats: number
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "chats", label: "Chats", icon: MessageCircle },
  { id: "marketplace", label: "Market", icon: ShoppingBag },
  { id: "profile", label: "Profile", icon: User },
]

export function BottomNav({ activeTab, onTabChange, unreadChats }: BottomNavProps) {
  return (
    <nav className="flex items-center justify-around border-t border-whatsapp-divider bg-card px-2 py-1" role="tablist">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            className={`relative flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
              isActive
                ? "text-whatsapp-green"
                : "text-whatsapp-text-secondary hover:text-foreground"
            }`}
          >
            <div className="relative">
              <Icon className="h-5 w-5" />
              {tab.id === "chats" && unreadChats > 0 && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {unreadChats > 99 ? "99+" : unreadChats}
                </span>
              )}
            </div>
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
