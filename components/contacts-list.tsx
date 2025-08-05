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
import { useFindChats } from "@/hooks/use-find-chats";

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
  remoteJid: string; // Adicionado para compatibilidade com Chat
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  profilePicUrl?: string; // Adicionado para compatibilidade com Chat
  pushName?: string; // Adicionado para compatibilidade com Chat
  updatedAt?: string; // Adicionado para compatibilidade com Chat
  messages: Message[];
}

type FilterType = "all" | "unread" | "favorites" | "groups";

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  searchText: string;
  onSearchChange: (value: string) => void;
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
  instanceId: string; // Adicionado para usar o hook useFindChats
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
  instanceId,
}: ContactsListProps) {
  const { chats, messages, loading, error, findChats, findMessages, findMessagesForChats } = useFindChats();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  //const [messagesLoading, setMessagesLoading] = useState<boolean>(false); // Novo estado
  //const [chats, setChats] = useState<any[]>([]); // Inicialize o estado dos chats como um array vazio
  const [instanceName, setInstanceName] = useState<string | null>(null);

 // Recupera o instanceName do Local Storage apenas no cliente
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

  useEffect(() => {
    if (instanceName) {
      findChats(instanceName); // Busca as conversas apenas se o instanceName estiver definido
    }
  }, [instanceName, findChats]);

useEffect(() => {
  if (instanceName) {
    findMessagesForChats(instanceName);
  }
}, [instanceName, findMessagesForChats]);

  //console.log("Estado de mensagens:", messages);

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
                        const success = await installApp();
                        if (success) onDownloadDialogChange(false);
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

      {/* Lista de Conversas */}
      <ScrollArea className="flex-1">
  {loading ? (
    <p className="text-center text-white">Carregando conversas...</p>
  ) : error ? (
    <p className="text-center text-red-500">{error}</p>
  ) : chats.length === 0 ? (
    <p className="text-center text-white">Nenhuma conversa encontrada.</p>
  ) : (
    chats.map((chat) => (
      <div
        key={chat.id}
        onClick={() => {
          // Use as mensagens associadas ao chat
          const chatMessages = chat.messages || [];

          // Atualiza o estado do chat selecionado
          setSelectedChat(chat.remoteJid);
          console.log("Mensagens associadas ao chat selecionado:", chatMessages);
          // Chama a função onContactSelect para passar os dados do contato selecionado
          onContactSelect({
            id: chat.id,
            remoteJid: chat.remoteJid,
            name: chat.pushName || chat.remoteJid.split("@")[0],
            avatar: chat.profilePicUrl || "/placeholder.svg",
            lastMessage: chat.lastMessage?.message.conversation || "",
            time: new Date(chat.updatedAt).toLocaleTimeString(),
            unread: 0,
            online: false,
            messages: chatMessages, // Passa as mensagens associadas ao chat
          });
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
                    .map((n) => n[0])
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
              {new Date(chat.updatedAt).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm whatsapp-text-secondary truncate">
              {chat.lastMessage?.message.conversation
                ? chat.lastMessage.message.conversation.slice(0, 20)
                : "Sem mensagens"}
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