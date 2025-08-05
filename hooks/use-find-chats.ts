import { useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Chat {
  id: string;
  remoteJid: string;
  pushName: string;
  profilePicUrl: string | null;
  updatedAt: string;
  windowStart: string;
  windowExpires: string;
  windowActive: boolean;
}

interface Message {
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
  instanceId: string;
  source: string;
  contextInfo: any;
  MessageUpdate: {
    status: string;
  }[];
}

export const useFindChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as conversas
  const findChats = useCallback(async (instanceId: string) => {
    if (!instanceId) {
      console.error("Instance ID não definido.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/chat/findChats/${instanceId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            apikey: API_KEY,
          },
        }
      );
      setChats(response.data); // Define as conversas no estado
    } catch (err) {
      console.error("Erro ao buscar conversas:", err);
      setError("Erro ao buscar conversas.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para buscar mensagens de uma conversa específica
  const findMessages = useCallback(
    async (instanceId: string, remoteJid: string) => {
      if (!instanceId) {
        console.error("Instance ID não definido.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/chat/findMessages/${instanceId}`,
          {
            where: {
              key: {
                remoteJid,
              },
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              apikey: API_KEY,
            },
          }
        );
        setMessages(response.data.messages.records); // Define os registros de mensagens no estado
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
        setError("Erro ao buscar mensagens.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    chats,
    messages,
    loading,
    error,
    findChats,
    findMessages,
  };
};