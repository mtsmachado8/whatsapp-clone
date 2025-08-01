import type { Agent } from "@/types"

export const initialAgents: Agent[] = [
  {
    id: "1",
    name: "Assistente de Vendas",
    description: "Especialista em produtos e vendas",
    status: "autonomous",
    conversations: 12,
    objective: "sales",
    companyName: "Minha Empresa Ltda",
    behavior:
      "Você é um assistente de vendas especializado em produtos eletrônicos. Seja sempre educado, proativo e focado em ajudar o cliente a encontrar o produto ideal. Use uma linguagem amigável e profissional.",
  },
  {
    id: "2",
    name: "Suporte Técnico",
    description: "Resolve problemas técnicos",
    status: "supervised",
    conversations: 8,
    objective: "support",
    companyName: "Tech Solutions",
    behavior:
      "Você é um especialista em suporte técnico. Seja paciente, detalhado e sempre busque resolver os problemas dos clientes de forma eficiente. Use linguagem técnica quando necessário, mas sempre explique de forma clara.",
  },
  {
    id: "3",
    name: "Atendimento Geral",
    description: "Atendimento inicial e triagem",
    status: "disabled",
    conversations: 0,
    objective: "personal",
    behavior:
      "Você é um assistente pessoal amigável. Ajude com tarefas gerais, seja prestativo e mantenha um tom casual e acolhedor.",
  },
]
