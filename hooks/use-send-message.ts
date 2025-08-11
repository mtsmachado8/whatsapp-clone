import { useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface SendMessageOptions {
  number: string;
  text: string;
  delay?: number;
  linkPreview?: boolean;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
  quoted?: {
    key: { id: string };
    message: { conversation: string };
  };
}

export function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const sendMessage = useCallback(
    async (instanceId: string, options: SendMessageOptions) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/message/sendText/${instanceId}`,
          {
            number: options.number,
            text: options.text,
            delay: options.delay ?? 0,
            linkPreview: options.linkPreview ?? false,
            mentionsEveryOne: options.mentionsEveryOne ?? false,
            mentioned: options.mentioned && options.mentioned.length > 0
      ? options.mentioned
      : [options.number + "@s.whatsapp.net"],
            quoted: options.quoted,
          },
          {
            headers: {
              "Content-Type": "application/json",
              apikey: API_KEY,
            },
          }
        );
        setSuccess(true);
        console.log("Mensagem enviada com sucesso:", response.data);
        return response.data;
      } catch (err: any) {
        setError(err?.response?.data?.message || "Erro ao enviar mensagem.");
        setSuccess(false);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { sendMessage, loading, error, success };
}