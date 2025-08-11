"use client"

import { useState, useCallback } from "react"
import { Menu } from "@/components/menu"
import { MessagesTab } from "@/components/messages-tab"

export function MainLayout() {
  const [activeTab, setActiveTab] = useState<"messages" | "agents">("messages")

  const handleTabChange = useCallback((tab: "messages" | "agents") => {
    setActiveTab(tab)
  }, [])
  console.log("MainLayout renderizou");
  return (
    <div className="flex h-screen whatsapp-bg">
      {/* Menu - Sidebar no desktop, bottom no mobile */}
      <Menu activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pb-0 pb-16">
        {activeTab === "messages" ? <MessagesTab /> : null}
      </div>
    </div>
  )
}
