"use client"

import { Search, MoreVertical, Download, Archive } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

type FilterType = "all" | "unread" | "favorites" | "groups"

interface ContactsListProps {
  contacts: Contact[]
  selectedContact: Contact | null
  searchText: string
  onSearchChange: (value: string) => void
  onContactSelect: (contact: Contact) => void
  onDownload: () => void
  showDownloadDialog: boolean
  onDownloadDialogChange: (open: boolean) => void
  isInstallable: boolean
  isInstalled: boolean
  installApp: () => Promise<boolean>
  getInstallInstructions: () => { browser: string; steps: string[] }
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function ContactsList({
  contacts,
  selectedContact,
  searchText,
  onSearchChange,
  onContactSelect,
  onDownload,
  showDownloadDialog,
  onDownloadDialogChange,
  isInstallable,
  isInstalled,
  installApp,
  getInstallInstructions,
  filter,
  onFilterChange,
}: ContactsListProps) {
  return (
    <div className="h-full whatsapp-sidebar flex flex-col border-r whatsapp-border">
      {/* Header da Sidebar */}
      <div className="p-4 whatsapp-header">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg md:text-xl font-medium text-white">WhatsApp</h1>
          <div className="flex items-center space-x-1">
            <Dialog open={showDownloadDialog} onOpenChange={onDownloadDialogChange}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full"
                  onClick={onDownload}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {isInstalled
                      ? "App Instalado"
                      : isInstallable
                        ? "Instalar WhatsApp Business"
                        : "Baixar WhatsApp Business"}
                  </DialogTitle>
                  <DialogDescription>
                    {isInstalled
                      ? "O WhatsApp Business já está instalado no seu dispositivo!"
                      : isInstallable
                        ? "Instale nosso aplicativo para ter acesso rápido e funcionalidades offline."
                        : "Instale nosso aplicativo como um web-app para melhor experiência."}
                  </DialogDescription>
                </DialogHeader>

                {isInstalled ? (
                  <div className="flex flex-col items-center space-y-3 py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-center text-sm text-gray-600">
                      Você pode acessar o WhatsApp Business diretamente da sua tela inicial!
                    </p>
                  </div>
                ) : isInstallable ? (
                  <div className="flex flex-col space-y-3">
                    <Button
                      onClick={async () => {
                        const success = await installApp()
                        if (success) onDownloadDialogChange(false)
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Instalar Agora
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      O app será instalado diretamente no seu dispositivo
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Como instalar no {getInstallInstructions().browser}:
                      </h4>
                      <ol className="text-sm text-blue-800 space-y-1">
                        {getInstallInstructions().steps.map((step, index) => (
                          <li key={index} className="flex">
                            <span className="mr-2 font-medium">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={() =>
                          window.open("https://play.google.com/store/apps/details?id=com.whatsapp.w4b", "_blank")
                        }
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Baixar para Android
                      </Button>
                      <Button
                        onClick={() =>
                          window.open("https://apps.apple.com/app/whatsapp-business/id1386412985", "_blank")
                        }
                        variant="outline"
                        className="w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Baixar para iOS
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 whatsapp-text-secondary h-4 w-4" />
          <Input
            placeholder="Pesquisar ou começar uma nova conversa"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-lg"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="px-4 pb-2">
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("all")}
            className={`rounded-full text-xs ${
              filter === "all"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "whatsapp-text-secondary hover:bg-white/10"
            }`}
          >
            Tudo
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("unread")}
            className={`rounded-full text-xs ${
              filter === "unread"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "whatsapp-text-secondary hover:bg-white/10"
            }`}
          >
            Não lidas
          </Button>
          <Button
            variant={filter === "favorites" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("favorites")}
            className={`rounded-full text-xs ${
              filter === "favorites"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "whatsapp-text-secondary hover:bg-white/10"
            }`}
          >
            Favoritas
          </Button>
          <Button
            variant={filter === "groups" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("groups")}
            className={`rounded-full text-xs ${
              filter === "groups"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "whatsapp-text-secondary hover:bg-white/10"
            }`}
          >
            Grupos
          </Button>
        </div>
      </div>

      {/* Arquivadas */}
      <div className="px-4 py-2">
        <div className="flex items-center p-3 whatsapp-hover rounded-lg cursor-pointer">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
            <Archive className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium whatsapp-text">Arquivadas</span>
              <span className="text-xs whatsapp-text-secondary">26</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Conversas */}
      <ScrollArea className="flex-1">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className={`flex items-center p-3 md:p-4 whatsapp-hover cursor-pointer ${
              selectedContact?.id === contact.id ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium whatsapp-text truncate">{contact.name}</h3>
                <span className="text-xs whatsapp-text-secondary">{contact.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm whatsapp-text-secondary truncate">
                  {contact.typing ? <span className="text-green-600 italic">digitando...</span> : contact.lastMessage}
                </p>
                {contact.unread > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full min-w-[20px]">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
