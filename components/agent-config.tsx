"use client"

import { useState, useEffect } from "react"
import { Bot, Save, ArrowLeft, Trash2, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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

interface AgentConfigProps {
  agent: Agent | null
  onBack: () => void
  onSave: (agent: Agent) => void
  onDelete: (agentId: string) => void
  isNewAgent?: boolean
}

export function AgentConfig({ agent, onBack, onSave, onDelete, isNewAgent = false }: AgentConfigProps) {
  // Criar um agente padrão se for novo
  const defaultAgent: Agent = {
    id: `new-${Date.now()}`,
    name: "",
    description: "",
    status: "disabled",
    conversations: 0,
    objective: "support",
    companyName: "",
    behavior: "",
  }

  const [formData, setFormData] = useState<Agent>(agent ? { ...agent } : defaultAgent)
  const [isTestMode, setIsTestMode] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (agent) {
      setFormData({ ...agent })
    }
  }, [agent])

  const handleInputChange = (field: keyof Agent, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleObjectiveChange = (value: "support" | "sales" | "personal") => {
    setFormData((prev) => ({
      ...prev,
      objective: value,
      companyName: value === "personal" ? "" : prev.companyName,
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  const handleCancel = () => {
    onBack()
  }

  const handleDelete = () => {
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    onDelete(agent.id)
    setShowDeleteDialog(false)
  }

  const getObjectiveLabel = (objective: string) => {
    switch (objective) {
      case "support":
        return "Suporte"
      case "sales":
        return "Vendas"
      case "personal":
        return "Uso Pessoal"
      default:
        return objective
    }
  }

  const getObjectiveBadgeColor = (objective: string) => {
    switch (objective) {
      case "support":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "sales":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "personal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "supervised":
        return "Supervisionado"
      case "autonomous":
        return "Autônomo"
      case "disabled":
        return "Desligado"
      default:
        return status
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "supervised":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "autonomous":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "disabled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="flex flex-col h-full whatsapp-chat-bg">
      {/* Header */}
      <div className="whatsapp-sidebar p-4 flex items-center justify-between border-b whatsapp-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 mr-3 bg-blue-500">
            <AvatarFallback className="bg-blue-500 text-white">
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-base whatsapp-text">
              {isNewAgent ? "Novo Agente" : formData.name || "Configurar Agente"}
            </h2>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getObjectiveBadgeColor(formData.objective)}`}>
                {getObjectiveLabel(formData.objective)}
              </Badge>
              <Badge className={`text-xs ${getStatusBadgeColor(formData.status)}`}>
                {getStatusLabel(formData.status)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="whatsapp-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            onClick={() => setIsTestMode(!isTestMode)}
          >
            <TestTube className="h-5 w-5" />
          </Button>
          {!isNewAgent && (
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Informações Básicas */}
          <div>
            <h3 className="text-lg font-medium whatsapp-text mb-4">Informações Básicas</h3>
            <p className="text-sm whatsapp-text-secondary mb-6">Configure as informações principais do seu agente IA</p>

            <div className="space-y-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="whatsapp-text">
                  Nome do Agente
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Assistente de Vendas"
                  className="whatsapp-sidebar border whatsapp-border whatsapp-text"
                />
              </div>

              {/* Objetivo */}
              <div className="space-y-2">
                <Label htmlFor="objective" className="whatsapp-text">
                  Objetivo
                </Label>
                <Select value={formData.objective} onValueChange={handleObjectiveChange}>
                  <SelectTrigger className="whatsapp-sidebar border whatsapp-border whatsapp-text">
                    <SelectValue placeholder="Selecione o objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Suporte</SelectItem>
                    <SelectItem value="sales">Vendas</SelectItem>
                    <SelectItem value="personal">Uso Pessoal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nome da Empresa (condicional) */}
              {formData.objective !== "personal" && (
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="whatsapp-text">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName || ""}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Ex: Minha Empresa Ltda"
                    className="whatsapp-sidebar border whatsapp-border whatsapp-text"
                  />
                </div>
              )}

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description" className="whatsapp-text">
                  Descrição Curta
                </Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Breve descrição que aparece na lista"
                  maxLength={50}
                  className="whatsapp-sidebar border whatsapp-border whatsapp-text"
                />
                <p className="text-xs whatsapp-text-secondary">{formData.description.length}/50 caracteres</p>
              </div>

              {/* Modo de Operação */}
              <div className="space-y-2">
                <Label htmlFor="status" className="whatsapp-text">
                  Modo de Operação
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "supervised" | "autonomous" | "disabled") =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger className="whatsapp-sidebar border whatsapp-border whatsapp-text">
                    <SelectValue placeholder="Selecione o modo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supervised">🟡 Supervisionado</SelectItem>
                    <SelectItem value="autonomous">🟢 Autônomo</SelectItem>
                    <SelectItem value="disabled">⚫ Desligado</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs whatsapp-text-secondary space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p>
                    <strong>🟡 Supervisionado:</strong> Ideal para treinamento ou situações sensíveis (sugere respostas
                    que precisam ser aprovadas)
                  </p>
                  <p>
                    <strong>🟢 Autônomo:</strong> Para agentes confiáveis que podem operar sozinhos sem supervisão
                  </p>
                  <p>
                    <strong>⚫ Desligado:</strong> Para manutenção ou quando não se quer usar o agente (não participa
                    das conversas)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comportamento */}
          <div>
            <h3 className="text-lg font-medium whatsapp-text mb-4">Comportamento do Agente</h3>
            <p className="text-sm whatsapp-text-secondary mb-6">
              Defina como o agente deve se comportar e responder às mensagens
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="behavior" className="whatsapp-text">
                  Prompt de Comportamento
                </Label>
                <Textarea
                  id="behavior"
                  value={formData.behavior}
                  onChange={(e) => handleInputChange("behavior", e.target.value)}
                  placeholder="Descreva detalhadamente como o agente deve se comportar, que tipo de linguagem usar, como responder a diferentes situações, etc."
                  rows={8}
                  className="whatsapp-sidebar border whatsapp-border whatsapp-text resize-none"
                />
                <p className="text-xs whatsapp-text-secondary">{formData.behavior.length} caracteres</p>
              </div>

              {/* Exemplo de prompt */}
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Exemplo de Prompt:</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  "Você é um assistente de vendas especializado em produtos eletrônicos. Seja sempre educado, proativo e
                  focado em ajudar o cliente a encontrar o produto ideal. Use uma linguagem amigável e profissional.
                  Sempre pergunte sobre as necessidades específicas do cliente antes de fazer recomendações."
                </p>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div>
            <h3 className="text-lg font-medium whatsapp-text mb-4">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{formData.conversations}</div>
                <div className="text-sm whatsapp-text-secondary">Conversas Ativas</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {getStatusLabel(formData.status)}
                </div>
                <div className="text-sm whatsapp-text-secondary">Modo Atual</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com botões */}
      <div className="whatsapp-sidebar p-4 border-t whatsapp-border">
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="whatsapp-text border whatsapp-border bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="mr-2 h-4 w-4" />
            {isNewAgent ? "Criar Agente" : "Salvar Configurações"}
          </Button>
        </div>
      </div>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Agente</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o agente "{agent.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
