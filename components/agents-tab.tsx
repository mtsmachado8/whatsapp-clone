"use client"

import { useState, useCallback } from "react"
import { Bot } from "lucide-react"
import { AgentsSection } from "@/components/agents-section"
import { AgentConfig } from "@/components/agent-config"
import { AgentTestChat } from "@/components/agent-test-chat"
import { useAgents } from "@/hooks/use-agents"

export function AgentsTab() {
  const [isTestingAgent, setIsTestingAgent] = useState(false)

  const { agents, selectedAgent, isCreatingNew, selectAgent, createNewAgent, saveAgent, deleteAgent, clearSelection } =
    useAgents()

  const handleAgentSelect = useCallback(
    (agent: any) => {
      selectAgent(agent)
      setIsTestingAgent(true) // Abrir chat de teste diretamente
    },
    [selectAgent],
  )

  const handleConfigureAgent = useCallback(
    (agent: any) => {
      selectAgent(agent)
      setIsTestingAgent(false) // Abrir configurações diretamente
    },
    [selectAgent],
  )

  const handleOpenAgentConfig = useCallback(() => {
    setIsTestingAgent(false)
  }, [])

  const handleAgentSave = useCallback(
    (agent: any) => {
      saveAgent(agent)
      setIsTestingAgent(true) // Abrir chat de teste após salvar
    },
    [saveAgent],
  )

  const handleAgentDelete = useCallback(
    (agentId: string) => {
      deleteAgent(agentId)
      setIsTestingAgent(false)
    },
    [deleteAgent],
  )

  const handleBackFromTest = useCallback(() => {
    setIsTestingAgent(false)
    clearSelection()
  }, [clearSelection])

  const handleBackToAgents = useCallback(() => {
    clearSelection()
    setIsTestingAgent(false)
  }, [clearSelection])

  return (
    <div className="flex h-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full h-full">
        {/* Agents List */}
        <div className="w-1/3 h-full">
          <AgentsSection
            agents={agents}
            onAgentSelect={handleAgentSelect}
            selectedAgent={selectedAgent}
            onCreateAgent={createNewAgent}
            onConfigureAgent={handleConfigureAgent}
          />
        </div>

        {/* Agent Content */}
        <div className="flex-1 h-full">
          {selectedAgent || isCreatingNew ? (
            isTestingAgent ? (
              <AgentTestChat agent={selectedAgent} onBack={handleBackFromTest} onOpenConfig={handleOpenAgentConfig} />
            ) : (
              <AgentConfig
                agent={selectedAgent}
                onBack={handleBackToAgents}
                onSave={handleAgentSave}
                onDelete={handleAgentDelete}
                isNewAgent={isCreatingNew}
              />
            )
          ) : (
            <div className="flex flex-1 items-center justify-center whatsapp-chat-bg chat-background h-full">
              <div className="text-center max-w-md mx-auto px-8">
                <div className="w-80 h-80 mx-auto mb-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <Bot className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-light whatsapp-text mb-4">Agentes IA</h2>
                <p className="whatsapp-text-secondary text-sm leading-relaxed">
                  Selecione um agente para configurar ou visualizar
                  <br />
                  suas conversas automatizadas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full h-full">
        {selectedAgent || isCreatingNew ? (
          isTestingAgent ? (
            <AgentTestChat agent={selectedAgent} onBack={handleBackFromTest} onOpenConfig={handleOpenAgentConfig} />
          ) : (
            <AgentConfig
              agent={selectedAgent}
              onBack={handleBackToAgents}
              onSave={handleAgentSave}
              onDelete={handleAgentDelete}
              isNewAgent={isCreatingNew}
            />
          )
        ) : (
          <AgentsSection
            agents={agents}
            onAgentSelect={handleAgentSelect}
            selectedAgent={selectedAgent}
            onCreateAgent={createNewAgent}
            onConfigureAgent={handleConfigureAgent}
          />
        )}
      </div>
    </div>
  )
}
