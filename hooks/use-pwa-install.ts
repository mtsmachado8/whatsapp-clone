"use client"

import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar se já está instalado
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      const isInWebAppiOS = (window.navigator as any).standalone === true
      setIsInstalled(isStandalone || isInWebAppiOS)
    }

    checkIfInstalled()

    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    // Listener para quando o app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return false

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setIsInstallable(false)
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao instalar o app:", error)
      return false
    }
  }

  const getInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
      return {
        browser: "Chrome",
        steps: [
          "Clique nos três pontos (⋮) no canto superior direito",
          'Selecione "Instalar WhatsApp Business"',
          'Clique em "Instalar" na janela que aparecer',
        ],
      }
    } else if (userAgent.includes("firefox")) {
      return {
        browser: "Firefox",
        steps: [
          "Clique no ícone de casa com um + na barra de endereços",
          'Selecione "Instalar"',
          "Confirme a instalação",
        ],
      }
    } else if (userAgent.includes("safari")) {
      return {
        browser: "Safari",
        steps: [
          "Clique no botão de compartilhar (□↗)",
          'Role para baixo e toque em "Adicionar à Tela de Início"',
          'Toque em "Adicionar"',
        ],
      }
    } else if (userAgent.includes("edg")) {
      return {
        browser: "Edge",
        steps: [
          "Clique nos três pontos (...) no canto superior direito",
          'Selecione "Aplicativos" > "Instalar este site como um aplicativo"',
          'Clique em "Instalar"',
        ],
      }
    }

    return {
      browser: "Navegador",
      steps: [
        'Procure pela opção "Instalar aplicativo" no menu do navegador',
        "Siga as instruções para adicionar à tela inicial",
      ],
    }
  }

  return {
    isInstallable,
    isInstalled,
    installApp,
    getInstallInstructions,
  }
}
