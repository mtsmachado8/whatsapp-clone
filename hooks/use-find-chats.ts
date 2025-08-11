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
  lastMessage?: Message; // Adicionada a propriedade opcional lastMessage
  messages?: Message[];
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
  const [chats, setChats] = useState<Chat[]>([]); // Estado para armazenar as conversas
  const [messages, setMessages] = useState<Message[]>([]); // Estado para armazenar mensagens
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros
  
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

  // Função para buscar mensagens para todas as conversas
  const findMessagesForChats = useCallback(
  async (instanceId: string) => {
    if (!instanceId || chats.length === 0) return;

    try {
      const updatedChats = await Promise.all(
        chats.map(async (chat) => {
          const response = await axios.post(
            `${API_BASE_URL}/chat/findMessages/${instanceId}`,
            {
              where: {
                key: {
                  remoteJid: chat.remoteJid,
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

          const messages = response.data.messages.records;
          const lastMessage = messages
            .sort(
              (a?: Message, b?: Message) =>
                (b?.messageTimestamp || 0) - (a?.messageTimestamp || 0)
            )
            .at(0);

          return {
            ...chat,
            messages, // Associa as mensagens ao chat
            lastMessage, // Adiciona a última mensagem ao objeto do chat
          };
        })
      );
      console.log("Chats atualizados com mensagens:", updatedChats);
      setChats(updatedChats); // Atualiza o estado dos chats com as mensagens associadas
    } catch (err) {
      console.error("Erro ao buscar mensagens para os chats:", err);
      setError("Erro ao buscar mensagens para os chats.");
    }
  },
  [chats]
);
  return {
    chats,
    messages,
    loading,
    error,
    findChats,
    findMessages,
    findMessagesForChats, // Certifique-se de retornar esta função
  };
};