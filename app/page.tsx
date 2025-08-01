"use client"

import { useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { MainLayout } from "@/components/main-layout"

export default function WhatsAppBusiness() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return <MainLayout />
}
