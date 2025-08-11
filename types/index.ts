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
  messages: Message[];
}

export interface Message {
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
}

export interface Agent {
  id: string
  name: string
  description: string
  status: "supervised" | "autonomous" | "disabled"
  conversations: number
  objective: "support" | "sales" | "personal"
  companyName?: string
  behavior: string
}

export type FilterType = "all" | "unread" | "favorites" | "groups"
