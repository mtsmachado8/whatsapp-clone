import type { Message } from "@/types"

export const messages: Message[] = [
  {
    id: "1",
    text: "Olá! Bem-vindo à nossa loja. Como posso ajudá-lo hoje?",
    time: "14:25",
    sent: true,
    read: true,
    delivered: true,
  },
  {
    id: "2",
    text: "Olá! Gostaria de saber mais sobre seus produtos",
    time: "14:26",
    sent: false,
    read: false,
    delivered: false,
  },
  {
    id: "3",
    text: "Claro! Temos uma grande variedade de produtos. Você está procurando algo específico?",
    time: "14:27",
    sent: true,
    read: true,
    delivered: true,
  },
  {
    id: "4",
    text: "Estou interessado em produtos para casa",
    time: "14:28",
    sent: false,
    read: false,
    delivered: false,
  },
  {
    id: "5",
    text: "Perfeito! Temos uma seção completa de produtos para casa. Posso enviar nosso catálogo?",
    time: "14:30",
    sent: true,
    read: false,
    delivered: true,
  },
]
