"use client"

import { useEffect } from "react"

export function PWAInstaller() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registrado com sucesso:", registration)
          })
          .catch((registrationError) => {
            console.log("Falha ao registrar SW:", registrationError)
          })
      })
    }
  }, [])

  return null
}
