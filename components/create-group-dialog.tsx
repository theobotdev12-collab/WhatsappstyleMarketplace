"use client"

import { useState } from "react"
import { X, Check, Camera } from "lucide-react"
import { mockChats } from "@/lib/mock-data"

interface CreateGroupDialogProps {
  open: boolean
  onClose: () => void
  onCreateGroup: (name: string, memberIds: string[]) => void
}

export function CreateGroupDialog({
  open,
  onClose,
  onCreateGroup,
}: CreateGroupDialogProps) {
  const [step, setStep] = useState<"select" | "name">("select")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [groupName, setGroupName] = useState("")

  const directChats = mockChats.filter((c) => c.type === "direct")

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const handleNext = () => {
    if (selectedMembers.length >= 1) {
      setStep("name")
    }
  }

  const handleCreate = () => {
    if (groupName.trim() && selectedMembers.length >= 1) {
      onCreateGroup(groupName.trim(), selectedMembers)
      setStep("select")
      setSelectedMembers([])
      setGroupName("")
      onClose()
    }
  }

  const handleClose = () => {
    setStep("select")
    setSelectedMembers([])
    setGroupName("")
    onClose()
  }

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 bg-whatsapp-teal px-4 py-3">
        <button onClick={handleClose} className="text-white" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-white">
            {step === "select" ? "Add members" : "New group"}
          </h2>
          {step === "select" && (
            <p className="text-xs text-white/70">
              {selectedMembers.length} of {directChats.length} selected
            </p>
          )}
        </div>
        {step === "select" && selectedMembers.length >= 1 && (
          <button
            onClick={handleNext}
            className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/30"
          >
            Next
          </button>
        )}
      </div>

      {step === "select" ? (
        <>
          {/* Selected chips */}
          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b border-whatsapp-divider px-4 py-3">
              {selectedMembers.map((id) => {
                const chat = directChats.find((c) => c.id === id)
                if (!chat) return null
                return (
                  <button
                    key={id}
                    onClick={() => toggleMember(id)}
                    className="flex items-center gap-1.5 rounded-full bg-whatsapp-green/10 py-1 pl-1 pr-2.5"
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-card-foreground">
                      {chat.name.split(" ")[0]}
                    </span>
                    <X className="h-3 w-3 text-whatsapp-text-secondary" />
                  </button>
                )
              })}
            </div>
          )}

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto">
            {directChats.map((chat) => {
              const isSelected = selectedMembers.includes(chat.id)
              return (
                <button
                  key={chat.id}
                  onClick={() => toggleMember(chat.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-whatsapp-green">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-card-foreground">
                    {chat.name}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      ) : (
        /* Name step */
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col items-center gap-4 px-6 py-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Camera className="h-8 w-8 text-whatsapp-text-secondary" />
            </div>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name"
              autoFocus
              className="w-full border-b-2 border-whatsapp-green bg-transparent pb-2 text-center text-lg font-medium text-card-foreground placeholder:text-whatsapp-text-secondary focus:outline-none"
            />
            <p className="text-xs text-whatsapp-text-secondary">
              {selectedMembers.length} participant{selectedMembers.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Selected members preview */}
          <div className="flex flex-wrap justify-center gap-3 px-6">
            {selectedMembers.map((id) => {
              const chat = directChats.find((c) => c.id === id)
              if (!chat) return null
              return (
                <div key={id} className="flex flex-col items-center gap-1">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="max-w-[56px] truncate text-[10px] text-whatsapp-text-secondary">
                    {chat.name.split(" ")[0]}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-auto p-4">
            <button
              onClick={handleCreate}
              disabled={!groupName.trim()}
              className="w-full rounded-full bg-whatsapp-green py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-green-dark disabled:opacity-40"
            >
              Create Group
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
