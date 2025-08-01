import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { PWAInstaller } from "@/components/pwa-installer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "WhatsApp Business Web",
  description: "Aplicativo de mensagens para empresas",
  manifest: "/manifest.json",
  themeColor: "#25d366",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WhatsApp Business",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <PWAInstaller />
        </ThemeProvider>
      </body>
    </html>
  )
}
