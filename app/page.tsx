"use client"

import { useState } from "react"
import { ChatList } from "@/components/chat-list"
import { MarketplaceGrid } from "@/components/marketplace-grid"
import { ProfileTab } from "@/components/profile-tab"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { mockChats } from "@/lib/mock-data"

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("chats")

  const totalUnread = mockChats.reduce((acc, chat) => acc + chat.unreadCount, 0)

  return (
    <div className="mx-auto flex h-dvh max-w-lg flex-col bg-background">
      <div className="flex-1 overflow-hidden">
        {activeTab === "chats" && <ChatList />}
        {activeTab === "marketplace" && <MarketplaceGrid />}
        {activeTab === "profile" && <ProfileTab />}
      </div>
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadChats={totalUnread}
      />
    </div>
  )
}
