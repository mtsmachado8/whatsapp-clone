"use client"

import { useState, useCallback } from "react"
import { initialAgents } from "@/data/agents"
import type { Agent } from "@/types"

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  const selectAgent = useCallback((agent: Agent) => {
    setSelectedAgent({ ...agent }) // Create a copy to avoid reference issues
    setIsCreatingNew(false)
  }, [])

  const createNewAgent = useCallback(() => {
    const newAgent: Agent = {
      id: `new-${Date.now()}`,
      name: "",
      description: "",
      status: "disabled",
      conversations: 0,
      objective: "support",
      companyName: "",
      behavior: "",
    }
    setSelectedAgent(newAgent)
    setIsCreatingNew(true)
  }, [])

  const saveAgent = useCallback(
    (agent: Agent) => {
      if (isCreatingNew) {
        // Add new agent
        const newAgent = { ...agent, id: `agent-${Date.now()}` }
        setAgents((prev) => [...prev, newAgent])
        setSelectedAgent(newAgent)
        setIsCreatingNew(false)
      } else {
        // Update existing agent
        setAgents((prev) => prev.map((a) => (a.id === agent.id ? agent : a)))
        setSelectedAgent(agent)
      }
    },
    [isCreatingNew],
  )

  const deleteAgent = useCallback((agentId: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId))
    setSelectedAgent(null)
    setIsCreatingNew(false)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedAgent(null)
    setIsCreatingNew(false)
  }, [])

  return {
    agents,
    selectedAgent,
    isCreatingNew,
    selectAgent,
    createNewAgent,
    saveAgent,
    deleteAgent,
    clearSelection,
  }
}
