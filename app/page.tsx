"use client"

import { useState, useEffect } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { MainLayout } from "@/components/main-layout"
import { ChatProvider } from "@/context/ChatContext"

export default function WhatsAppBusiness() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [instanceId, setInstanceId] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("instanceName")
      if (stored) setInstanceId(stored)
    }
  }, [])

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <ChatProvider instanceId={instanceId}>
      <MainLayout />
    </ChatProvider>
  )
}