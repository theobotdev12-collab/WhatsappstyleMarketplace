"use client"

import { useState } from "react"
import { Search, MessageSquarePlus } from "lucide-react"
import { ChatItem } from "./chat-item"
import { ProductCardChat } from "./product-card-chat"
import type { Chat } from "@/lib/types"
import { mockChats } from "@/lib/mock-data"

export function ChatList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleChatTap = (chatId: string) => {
    const chat = mockChats.find((c) => c.id === chatId)
    if (chat) setSelectedChat(chat)
  }

  if (selectedChat) {
    return (
      <div className="flex h-full flex-col bg-card">
        {/* Conversation header */}
        <div className="flex items-center gap-3 border-b border-whatsapp-divider bg-whatsapp-teal px-4 py-3">
          <button
            onClick={() => setSelectedChat(null)}
            className="text-sm font-medium text-white"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">
                {selectedChat.name}
              </h2>
              <p className="text-xs text-white/70">Online</p>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#ECE5DD] p-4">
          <div className="self-start rounded-lg rounded-tl-none bg-card px-3 py-2 shadow-sm">
            <p className="text-sm text-card-foreground">
              Hey! Check out this product I found:
            </p>
            <span className="text-[11px] text-whatsapp-text-secondary">
              2:30 PM
            </span>
          </div>

          {selectedChat.hasProduct && (
            <div className="self-start">
              <ProductCardChat
                productId="demo-1"
                title="Wireless Noise-Cancelling Headphones"
                price={89.99}
                currency="USD"
                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                seller={{
                  name: "TechStore",
                  avatar: "https://i.pravatar.cc/48?img=30",
                }}
                onTap={() => {}}
              />
            </div>
          )}

          <div className="self-end rounded-lg rounded-tr-none bg-whatsapp-green-light px-3 py-2 shadow-sm">
            <p className="text-sm text-card-foreground">
              {selectedChat.lastMessage}
            </p>
            <span className="text-[11px] text-whatsapp-text-secondary">
              2:32 PM
            </span>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-whatsapp-divider bg-card px-4 py-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm text-card-foreground placeholder:text-whatsapp-text-secondary focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
          />
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp-green text-white transition-colors hover:bg-whatsapp-green-dark">
            <MessageSquarePlus className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between bg-whatsapp-teal px-4 py-3">
        <h1 className="text-lg font-bold text-white">Chats</h1>
        <button className="text-white/80 transition-colors hover:text-white">
          <MessageSquarePlus className="h-5 w-5" />
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-whatsapp-divider bg-card px-4 py-2">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Search className="h-4 w-4 text-whatsapp-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="flex-1 bg-transparent text-sm text-card-foreground placeholder:text-whatsapp-text-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-whatsapp-text-secondary">
            <Search className="mb-2 h-8 w-8" />
            <p className="text-sm">No chats found</p>
          </div>
        ) : (
          <div className="divide-y divide-whatsapp-divider">
            {filteredChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} onTap={handleChatTap} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
