"use client"

import { useState, useCallback } from "react"
import { ContactsList } from "@/components/contacts-list"
import { ChatArea } from "@/components/chat-area"
import { usePWAInstall } from "@/hooks/use-pwa-install"
import { contacts } from "@/data/contacts"
import { messages } from "@/data/messages"
import type { Contact, FilterType } from "@/types"

export function MessagesTab() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messageText, setMessageText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [filter, setFilter] = useState<FilterType>("all")

  const { isInstallable, isInstalled, installApp, getInstallInstructions } = usePWAInstall()

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Enviando mensagem:", messageText)
      setMessageText("")
    }
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
  }

  const handleBackToContacts = () => {
    setSelectedContact(null)
  }

  const handleDownload = async () => {
    if (isInstallable) {
      const success = await installApp()
      if (success) {
        setShowDownloadDialog(false)
      }
    } else {
      setShowDownloadDialog(true)
    }
  }

  const handleSearchTextChange = useCallback((value: string) => {
    setSearchText(value)
  }, [])

  const handleMessageTextChange = useCallback((value: string) => {
    setMessageText(value)
  }, [])

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter)
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchText.toLowerCase())

    switch (filter) {
      case "unread":
        return matchesSearch && contact.unread > 0
      case "favorites":
        return matchesSearch // Implementar lógica de favoritos
      case "groups":
        return matchesSearch // Implementar lógica de grupos
      default:
        return matchesSearch
    }
  })

  return (
    <div className="flex h-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full h-full">
        {/* Contacts List */}
        <div className="w-1/3 h-full">
          <ContactsList
            contacts={filteredContacts}
            selectedContact={selectedContact}
            searchText={searchText}
            onSearchChange={handleSearchTextChange}
            onContactSelect={handleContactSelect}
            onDownload={handleDownload}
            showDownloadDialog={showDownloadDialog}
            onDownloadDialogChange={setShowDownloadDialog}
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            installApp={installApp}
            getInstallInstructions={getInstallInstructions}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 h-full">
          <ChatArea
            selectedContact={selectedContact}
            messages={messages}
            messageText={messageText}
            onMessageChange={handleMessageTextChange}
            onSendMessage={handleSendMessage}
            onBackToContacts={handleBackToContacts}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full h-full">
        {selectedContact ? (
          <ChatArea
            selectedContact={selectedContact}
            messages={messages}
            messageText={messageText}
            onMessageChange={handleMessageTextChange}
            onSendMessage={handleSendMessage}
            onBackToContacts={handleBackToContacts}
          />
        ) : (
          <ContactsList
            contacts={filteredContacts}
            selectedContact={selectedContact}
            searchText={searchText}
            onSearchChange={handleSearchTextChange}
            onContactSelect={handleContactSelect}
            onDownload={handleDownload}
            showDownloadDialog={showDownloadDialog}
            onDownloadDialogChange={setShowDownloadDialog}
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            installApp={installApp}
            getInstallInstructions={getInstallInstructions}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>
    </div>
  )
}
