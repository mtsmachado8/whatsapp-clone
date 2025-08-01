"use client"

import { useState, useEffect } from "react"
import { Smartphone, Lock, Info, ChevronRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "next-themes"
import { QRCodeGenerator } from "./qr-code-generator"

interface AuthScreenProps {
  onAuthenticated: () => void
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [stayConnected, setStayConnected] = useState(true)
  const [authStatus, setAuthStatus] = useState<"waiting" | "scanning" | "success" | "error">("waiting")
  const [countdown, setCountdown] = useState(300) // 5 minutes
  const { theme } = useTheme()

  // Countdown timer
  useEffect(() => {
    if (authStatus === "waiting" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setAuthStatus("error")
    }
  }, [countdown, authStatus])

  const handleQRScan = (data: string) => {
    setAuthStatus("scanning")

    // Simulate authentication process
    setTimeout(() => {
      try {
        const authData = JSON.parse(data)
        if (authData.ref && authData.clientToken) {
          setAuthStatus("success")
          setTimeout(() => {
            onAuthenticated()
          }, 2000)
        } else {
          setAuthStatus("error")
        }
      } catch (error) {
        setAuthStatus("error")
      }
    }, 2000)
  }

  const handlePhoneLogin = () => {
    // Implementar login por telefone
    console.log("Login por telefone")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusMessage = () => {
    switch (authStatus) {
      case "waiting":
        return "Aguardando escaneamento do código..."
      case "scanning":
        return "Código escaneado! Autenticando..."
      case "success":
        return "Autenticação realizada com sucesso!"
      case "error":
        return "Código expirado ou inválido. Gere um novo código."
      default:
        return "Aguardando escaneamento do código..."
    }
  }

  const getStatusIcon = () => {
    switch (authStatus) {
      case "scanning":
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen whatsapp-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light whatsapp-text mb-4">WhatsApp Business Web</h1>
          <div className="flex items-center justify-center space-x-2 text-sm whatsapp-text-secondary">
            <Lock className="h-4 w-4" />
            <span>
              Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta em todos os seus dispositivos.
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="whatsapp-sidebar rounded-2xl p-8 shadow-lg border whatsapp-border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Instructions */}
            <div className="space-y-8">
              <h2 className="text-2xl font-medium whatsapp-text mb-6">Etapas para acessar</h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      Abra o <strong>WhatsApp Business</strong>{" "}
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 rounded text-white text-xs font-bold">
                        <Smartphone className="h-3 w-3" />
                      </span>{" "}
                      no seu celular.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      No Android, toque em <strong>Mais opções</strong> ⋮ .<br />
                      No iPhone, toque em <strong>Configurações</strong> ⚙️ .
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      Toque em <strong>Dispositivos conectados</strong> e, em seguida, em{" "}
                      <strong>Conectar dispositivo</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">4</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      <strong>Escaneie o QR code</strong> para confirmar
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Login Link */}
              <Button
                variant="link"
                onClick={handlePhoneLogin}
                className="p-0 h-auto text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Entrar com número de telefone
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

              {/* Stay Connected Checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="stay-connected"
                  checked={stayConnected}
                  onCheckedChange={setStayConnected}
                  className="border-green-600 data-[state=checked]:bg-green-600"
                />
                <label htmlFor="stay-connected" className="text-sm whatsapp-text cursor-pointer">
                  Continuar conectado
                </label>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 whatsapp-text-secondary">
                  <Info className="h-3 w-3" />
                </Button>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Conexão Segura</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Este QR code é único e expira automaticamente. Nunca compartilhe com terceiros.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="flex flex-col items-center space-y-6">
              {/* QR Code Generator */}
              <QRCodeGenerator onScan={handleQRScan} />

              {/* Status Display */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  {getStatusIcon()}
                  <p
                    className={`text-sm font-medium ${
                      authStatus === "success"
                        ? "text-green-600 dark:text-green-400"
                        : authStatus === "error"
                          ? "text-red-600 dark:text-red-400"
                          : authStatus === "scanning"
                            ? "text-blue-600 dark:text-blue-400"
                            : "whatsapp-text-secondary"
                    }`}
                  >
                    {getStatusMessage()}
                  </p>
                </div>

                {authStatus === "waiting" && (
                  <p className="text-xs whatsapp-text-secondary">Tempo restante: {formatTime(countdown)}</p>
                )}
              </div>

              {/* Phone Illustration */}
              <div className="relative">
                <div className="w-48 h-80 bg-gray-200 dark:bg-gray-700 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl relative overflow-hidden">
                    {/* Phone Screen */}
                    <div className="absolute inset-0 p-4">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="text-xs whatsapp-text-secondary">100%</div>
                      </div>

                      {/* WhatsApp Header */}
                      <div className="bg-green-500 text-white p-3 rounded-t-lg mb-2">
                        <div className="text-sm font-medium">WhatsApp Business</div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-2">
                        <div
                          className={`flex items-center space-x-3 p-2 rounded ${
                            authStatus === "scanning" || authStatus === "success"
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full ${
                              authStatus === "scanning" || authStatus === "success"
                                ? "bg-green-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          ></div>
                          <div className="text-xs whatsapp-text">Dispositivos conectados</div>
                        </div>
                        <div className="flex items-center space-x-3 p-2">
                          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          <div className="text-xs whatsapp-text-secondary">Configurações</div>
                        </div>
                      </div>
                    </div>

                    {/* Success Animation */}
                    {authStatus === "success" && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Cursor/Pointer */}
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 transform rotate-12 transition-colors ${
                    authStatus === "scanning" || authStatus === "success"
                      ? "bg-green-600 dark:bg-green-400"
                      : "bg-gray-600 dark:bg-gray-300"
                  }`}
                  style={{ clipPath: "polygon(0 0, 100% 40%, 40% 100%)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs whatsapp-text-secondary">
            Ao usar o WhatsApp Business Web, você concorda com nossos{" "}
            <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
