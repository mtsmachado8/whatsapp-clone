"use client"

import { Phone, Video, Paperclip, Mic, Send, CheckCheck, ArrowLeft, MoreVertical, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from "lucide-react"

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
}

interface Message {
  id: string
  text: string
  time: string
  sent: boolean
  read: boolean
  delivered: boolean
}

interface ChatAreaProps {
  selectedContact: Contact | null
  messages: Message[]
  messageText: string
  onMessageChange: (value: string) => void
  onSendMessage: () => void
  onBackToContacts: () => void
}

export function ChatArea({
  selectedContact,
  messages,
  messageText,
  onMessageChange,
  onSendMessage,
  onBackToContacts,
}: ChatAreaProps) {
  if (!selectedContact) {
    return (
      <div className="hidden lg:flex flex-1 items-center justify-center whatsapp-chat-container">
        <div className="text-center max-w-md mx-auto px-8">
          <div className="w-80 h-80 mx-auto mb-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-16 h-16 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <h2 className="text-3xl font-light whatsapp-text mb-4">WhatsApp Business Web</h2>
          <p className="whatsapp-text-secondary text-sm leading-relaxed">
            Selecione uma conversa para começar a enviar mensagens
            <br />
            para seus clientes.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full whatsapp-chat-bg">
      {/* Header do Chat */}
      <div className="whatsapp-sidebar p-3 md:p-4 flex items-center justify-between border-b whatsapp-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
            onClick={onBackToContacts}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
            <AvatarFallback>
              {selectedContact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-base whatsapp-text">{selectedContact.name}</h2>
            <p className="text-sm whatsapp-text-secondary">
              {selectedContact.online ? "online" : "visto por último hoje às 13:45"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <MoreVertical className="h-5 w-5" />
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
                        : "whatsapp-message-received whatsapp-text border whatsapp-border"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.sent ? "text-green-100" : "whatsapp-text-secondary"
                      }`}
                    >
                      <span className="text-xs">{message.time}</span>
                      {message.sent && (
                        <div className="flex">
                          {message.read ? (
                            <CheckCheck className="h-3 w-3 text-blue-300" />
                          ) : message.delivered ? (
                            <CheckCheck className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                      )}
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
              placeholder="Digite uma mensagem"
              value={messageText}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
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
            onClick={onSendMessage}
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
