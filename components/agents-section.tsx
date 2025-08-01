"use client"

import { Bot, Plus, Zap, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

interface AgentsSectionProps {
  agents: Agent[]
  onAgentSelect: (agent: Agent) => void
  selectedAgent: Agent | null
  onCreateAgent: () => void
  onConfigureAgent: (agent: Agent) => void
}

export function AgentsSection({
  agents,
  onAgentSelect,
  selectedAgent,
  onCreateAgent,
  onConfigureAgent,
}: AgentsSectionProps) {
  return (
    <div className="h-full whatsapp-sidebar flex flex-col border-r whatsapp-border">
      {/* Header */}
      <div className="p-4 whatsapp-header">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg md:text-xl font-medium text-white">Agentes IA</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
            onClick={onCreateAgent}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-white/70">Gerencie seus assistentes virtuais</p>
      </div>

      {/* Agents List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`flex items-center p-3 whatsapp-hover rounded-lg border whatsapp-border ${
                selectedAgent?.id === agent.id ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 bg-blue-100 dark:bg-blue-900">
                  <AvatarFallback className="bg-blue-500 text-white">
                    <Bot className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    agent.status === "autonomous"
                      ? "bg-green-500"
                      : agent.status === "supervised"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
                ></div>
              </div>

              <div className="ml-3 flex-1 min-w-0 cursor-pointer" onClick={() => onAgentSelect(agent)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium whatsapp-text truncate">{agent.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs whatsapp-text-secondary">{agent.conversations}</span>
                  </div>
                </div>
                <p className="text-sm whatsapp-text-secondary truncate">{agent.description}</p>
                <div className="flex items-center mt-1">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      agent.status === "autonomous"
                        ? "bg-green-500"
                        : agent.status === "supervised"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="text-xs whatsapp-text-secondary">
                    {agent.status === "autonomous"
                      ? "Autônomo"
                      : agent.status === "supervised"
                        ? "Supervisionado"
                        : "Desligado"}
                  </span>
                </div>
              </div>

              <div className="ml-2 flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    onConfigureAgent(agent)
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Create Agent Button */}
      <div className="p-4 border-t whatsapp-border">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={onCreateAgent}>
          <Plus className="mr-2 h-4 w-4" />
          Criar Novo Agente
        </Button>
      </div>
    </div>
  )
}
