"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import { useTheme } from "next-themes"
import { RefreshCw, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QRCodeGeneratorProps {
  onScan?: (data: string) => void
  className?: string
}

export function QRCodeGenerator({ onScan, className }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrData, setQrData] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const generateQRCode = async () => {
    if (!canvasRef.current) return

    setIsGenerating(true)

    try {
      // Generate a realistic WhatsApp Business authentication string
      const timestamp = Date.now()
      const sessionId = Math.random().toString(36).substring(2, 15)
      const deviceId = Math.random().toString(36).substring(2, 10)

      // WhatsApp-like authentication data structure
      const authData = {
        ref: `${sessionId}_${deviceId}`,
        publicKey: btoa(Math.random().toString(36).substring(2, 50)),
        clientToken: btoa(`whatsapp_business_${timestamp}`),
        serverToken: btoa(`server_${sessionId}`),
        browserToken: btoa(`browser_${deviceId}_${timestamp}`),
        secret: btoa(Math.random().toString(36).substring(2, 32)),
        timestamp: timestamp,
        ttl: 300000, // 5 minutes
        version: "2.2412.54",
        platform: "web",
      }

      const qrString = JSON.stringify(authData)
      setQrData(qrString)

      // Determine colors based on theme
      const isDark = resolvedTheme === "dark"
      const foregroundColor = isDark ? "#ffffff" : "#000000"
      const backgroundColor = isDark ? "#1f2937" : "#ffffff"

      // Generate QR code with theme-appropriate colors
      await QRCode.toCanvas(canvasRef.current, qrString, {
        width: 280,
        margin: 2,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        errorCorrectionLevel: "M",
      })

      // Simulate scanning detection after random time (3-8 seconds)
      const scanDelay = Math.random() * 5000 + 3000
      setTimeout(() => {
        if (onScan) {
          onScan(qrString)
        }
      }, scanDelay)
    } catch (error) {
      console.error("Error generating QR code:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate QR code on mount and theme change
  useEffect(() => {
    if (mounted) {
      generateQRCode()
    }
  }, [mounted, resolvedTheme])

  // Regenerate QR code every 5 minutes for security
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      generateQRCode()
    }, 300000) // 5 minutes

    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-80 h-80 bg-white dark:bg-gray-100 rounded-lg p-4 shadow-lg border-2 border-gray-200 dark:border-gray-300 relative">
        <canvas ref={canvasRef} className="w-full h-full rounded" style={{ imageRendering: "pixelated" }} />

        {/* WhatsApp Logo Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-100/80 rounded flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-800">Gerando código...</span>
            </div>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <Button
          variant="outline"
          size="sm"
          onClick={generateQRCode}
          disabled={isGenerating}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isGenerating ? "animate-spin" : ""}`} />
          Novo código
        </Button>
      </div>

      {/* QR Code Info */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs whatsapp-text-secondary">Código expira em 5 minutos</p>
      </div>
    </div>
  )
}
