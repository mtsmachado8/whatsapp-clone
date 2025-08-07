import { createContext, useContext, useEffect, useState } from "react";
import { useFindChats } from "@/hooks/use-find-chats";

// Defina o tipo Contact
export interface Contact {
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
  messages: any[];
}

interface ChatContextType {
  chats: Contact[];
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  loading: boolean;
  error: string | null;
}

const ChatContext = createContext<ChatContextType>({
  chats: [],
  selectedContact: null,
  setSelectedContact: () => {},
  loading: false,
  error: null,
});

export function ChatProvider({ instanceId, children }: { instanceId: string; children: React.ReactNode }) {
  const { chats: rawChats, findChats, loading, error } = useFindChats();
  const [chats, setChats] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Mapeia os chats recebidos para o tipo Contact
  useEffect(() => {
    if (!rawChats || rawChats.length === 0) {
      setChats([]);
      return;
    }
    const mappedChats: Contact[] = rawChats.map((chat: any) => ({
      id: chat.id,
      remoteJid: chat.remoteJid,
      name: chat.pushName || chat.remoteJid.split("@")[0],
      avatar: chat.profilePicUrl || "/placeholder.svg",
      lastMessage: chat.lastMessage?.message?.conversation || "",
      time: chat.updatedAt ? new Date(chat.updatedAt).toLocaleTimeString() : "",
      unread: chat.unread || 0,
      online: false,
      typing: chat.typing,
      profilePicUrl: chat.profilePicUrl,
      pushName: chat.pushName,
      updatedAt: chat.updatedAt,
      messages: chat.messages || [],
    }));
    setChats(mappedChats);
  }, [rawChats]);

  useEffect(() => {
    if (!instanceId) return;
    findChats(instanceId);
    const interval = setInterval(() => {
      findChats(instanceId);
    }, 7000);
    return () => clearInterval(interval);
  }, [instanceId, findChats]);

  // Sincroniza selectedContact com chats atualizados
  useEffect(() => {
  if (!selectedContact) return;
  const updated = chats.find(chat => chat.remoteJid === selectedContact.remoteJid);
  if (updated) setSelectedContact({ ...updated }); // força nova referência
}, [chats]);

  return (
    <ChatContext.Provider value={{
      chats,
      selectedContact,
      setSelectedContact,
      loading,
      error
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}