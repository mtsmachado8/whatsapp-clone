export interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
}

export interface Message {
  id: string
  text: string
  time: string
  sent: boolean
  read: boolean
  delivered: boolean
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
