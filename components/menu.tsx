"use client"
import { MessageCircle, Bot, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MenuProps {
  activeTab: "messages" | "agents"
  onTabChange: (tab: "messages" | "agents") => void
}

export function Menu({ activeTab, onTabChange }: MenuProps) {
  return (
    <>
      {/* Desktop Sidebar Menu */}
      <div className="hidden lg:flex w-16 whatsapp-sidebar border-r whatsapp-border flex-col items-center py-4">
        {/* Menu Items */}
        <div className="flex flex-col space-y-4">
          {/* Messages */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onTabChange("messages")}
              className={`w-12 h-12 rounded-lg ${
                activeTab === "messages"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">5</span>
            </div>
          </div>
          
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Items */}
        <div className="flex flex-col space-y-4">
          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32&text=U" alt="User" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Bottom Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 whatsapp-sidebar border-t whatsapp-border z-50">
        <div className="flex items-center justify-around py-2 px-4">
          {/* Messages */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onTabChange("messages")}
              className={`w-12 h-12 rounded-lg ${
                activeTab === "messages"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">5</span>
            </div>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-lg whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32&text=U" alt="User" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  )
}
