"use client"

import { useState, useEffect } from "react"
import { Bot, Send, ArrowLeft, Settings, Mic, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  description: string
  status: "supervised" | "autonomous" | "disabled"
  conversations: number
  objective: "support" | "sales" | "personal"
  companyName?: string
  behavior: string
}

interface Message {
  id: string
  text: string
  time: string
  sent: boolean
  isAgent?: boolean
}

interface AgentTestChatProps {
  agent: Agent
  onBack: () => void
  onOpenConfig: () => void
}

export function AgentTestChat({ agent, onBack, onOpenConfig }: AgentTestChatProps) {
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Olá! Sou o ${agent.name}. Como posso ajudá-lo hoje?`,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      sent: false,
      isAgent: true,
    },
  ])

  useEffect(() => {
    // Reset messages when agent changes
    setMessages([
      {
        id: "1",
        text: `Olá! Sou o ${agent.name}. Como posso ajudá-lo hoje?`,
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        sent: false,
        isAgent: true,
      },
    ])
  }, [agent.id, agent.name])

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "supervised":
        return "Supervisionado"
      case "autonomous":
        return "Autônomo"
      case "disabled":
        return "Desligado"
      default:
        return status
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "supervised":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "autonomous":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "disabled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        sent: true,
      }

      setMessages((prev) => [...prev, newMessage])
      setMessageText("")

      // Simular resposta do agente após 1 segundo
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `Esta é uma resposta simulada do ${agent.name}. Em um ambiente real, esta resposta seria gerada pela IA baseada no comportamento configurado.`,
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          sent: false,
          isAgent: true,
        }
        setMessages((prev) => [...prev, agentResponse])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full whatsapp-chat-bg">
      {/* Header */}
      <div className="whatsapp-sidebar p-4 flex items-center justify-between border-b whatsapp-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 mr-3 bg-blue-500">
            <AvatarFallback className="bg-blue-500 text-white">
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-base whatsapp-text">{agent.name}</h2>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getStatusBadgeColor(agent.status)}`}>{getStatusLabel(agent.status)}</Badge>
              <span className="text-xs whatsapp-text-secondary">Modo de Teste</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            onClick={onOpenConfig}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full chat-background">
          <div className="p-4 chat-messages">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                      message.sent
                        ? "bg-green-500 text-white"
                        : message.isAgent
                          ? "bg-blue-100 dark:bg-blue-900 whatsapp-text border border-blue-200 dark:border-blue-800"
                          : "whatsapp-message-received whatsapp-text border whatsapp-border"
                    }`}
                  >
                    {message.isAgent && (
                      <div className="flex items-center mb-1">
                        <Bot className="h-3 w-3 mr-1 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Agente IA</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.sent ? "text-green-100" : "whatsapp-text-secondary"
                      }`}
                    >
                      <span className="text-xs">{message.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Área de Input */}
      <div className="whatsapp-sidebar p-4 border-t whatsapp-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex-shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              placeholder="Digite uma mensagem para testar o agente..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12 rounded-lg whatsapp-sidebar border whatsapp-border whatsapp-text"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleSendMessage}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full flex-shrink-0"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
