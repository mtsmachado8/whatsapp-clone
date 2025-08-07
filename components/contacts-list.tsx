"use client";

import { useEffect, useState } from "react";
import { Search, MoreVertical, Download, Archive } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useChat } from "@/context/ChatContext";

interface Message {
  id: string;
  key: {
    id: string;
    fromMe: boolean;
    remoteJid: string;
  };
  pushName: string;
  messageType: string;
  message: {
    conversation: string;
  };
  messageTimestamp: number;
  instanceId?: string;
  source?: string;
  contextInfo?: any;
  MessageUpdate?: Array<{
    status: string;
  }>;
}

interface Contact {
  id: string;
  remoteJid: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  profilePicUrl?: string;
  pushName?: string;
  updatedAt?: string;
  messages: Message[];
}

type FilterType = "all" | "unread" | "favorites" | "groups";

interface ContactsListProps {
  selectedContact: Contact | null;
  searchText: string;
  onMessageChange?: (value: string) => void;
  onSendMessage?: () => void;
  onContactSelect: (contact: Contact) => void;
  onDownload: () => void;
  showDownloadDialog: boolean;
  onDownloadDialogChange: (open: boolean) => void;
  isInstallable: boolean;
  isInstalled: boolean;
  installApp: () => Promise<boolean>;
  getInstallInstructions: () => { browser: string; steps: string[] };
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  instanceId: string;
}

export function ContactsList({
  selectedContact,
  searchText,
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
  instanceId,
}: ContactsListProps) {
  const { chats, selectedContact: contextSelectedContact, setSelectedContact, loading, error } = useChat();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [instanceName, setInstanceName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInstanceName = localStorage.getItem("instanceName");
      if (storedInstanceName) {
        setInstanceName(storedInstanceName);
      } else {
        console.error("InstanceName não encontrado no localStorage.");
      }
    }
  }, []);

  // Filtragem de chats pelo texto de busca
  const filteredChats = chats.filter((chat: Contact) => {
    const name = chat.pushName || chat.remoteJid.split("@")[0];
    return name.toLowerCase().includes(searchText.toLowerCase());
  });

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
                {/* ...restante do Dialog... */}
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
            onChange={(e) => {
              if (typeof e.target.value === "string") {
                // Protege contra erro de tipagem
                onContactSelect(selectedContact ?? null);
              }
            }}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-lg"
          />
        </div>
      </div>

      {/* Lista de Conversas */}
      <ScrollArea className="flex-1">
        {loading ? (
          <p className="text-center text-white">Carregando conversas...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredChats.length === 0 ? (
          <p className="text-center text-white">Nenhuma conversa encontrada.</p>
        ) : (
          filteredChats.map((chat: Contact) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.remoteJid);
                setSelectedContact(chat);
                onContactSelect(chat);
              }}
              className={`flex items-center p-3 md:p-4 whatsapp-hover cursor-pointer ${
                selectedChat === chat.remoteJid ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={chat.profilePicUrl || "/placeholder.svg"}
                    alt={chat.pushName || chat.remoteJid}
                  />
                  <AvatarFallback>
                    {chat.pushName
                      ? chat.pushName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : chat.remoteJid[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium whatsapp-text truncate">
                    {chat.pushName || chat.remoteJid.split("@")[0]}
                  </h3>
                  <span className="text-xs whatsapp-text-secondary">
                    {new Date(chat.updatedAt ?? "").toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm whatsapp-text-secondary truncate">
                    {chat.lastMessage
                      ? `${chat.lastMessage.slice(0, 30)}...`
                      : "Carregando..."}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}