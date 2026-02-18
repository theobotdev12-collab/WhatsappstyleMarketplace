/* eslint-disable @next/next/no-img-element */
"use client"

import { Users } from "lucide-react"
import { format, isToday, isYesterday } from "date-fns"
import type { Chat } from "@/lib/types"

interface ChatItemProps {
  chat: Chat
  onTap: (chatId: string) => void
}

function formatTimestamp(date: Date): string {
  if (isToday(date)) return format(date, "h:mm a")
  if (isYesterday(date)) return "Yesterday"
  return format(date, "MM/dd/yy")
}

export function ChatItem({ chat, onTap }: ChatItemProps) {
  const timeLabel = formatTimestamp(chat.timestamp)

  return (
    <button
      onClick={() => onTap(chat.id)}
      className="flex w-full items-center gap-4 bg-card px-4 py-3 text-left transition-colors hover:bg-secondary/60"
      style={{ height: 72 }}
    >
      <div className="relative flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chat.avatar}
          alt={chat.name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        {chat.type === "group" && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-whatsapp-teal">
            <Users className="h-3 w-3 text-white" />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="truncate text-[15px] font-semibold text-card-foreground">
            {chat.name}
          </span>
          <span
            className={`flex-shrink-0 text-xs ${
              chat.unreadCount > 0
                ? "font-medium text-whatsapp-green"
                : "text-whatsapp-text-secondary"
            }`}
          >
            {timeLabel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="truncate text-sm text-whatsapp-text-secondary">
            {chat.hasProduct && (
              <span className="mr-1 inline-block" aria-label="Product shared">
                {"🛒"}
              </span>
            )}
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="ml-2 flex h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-whatsapp-green px-1.5 text-[11px] font-bold text-white">
              {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
