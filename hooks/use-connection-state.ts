import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://evolution-api-5ywd.onrender.com"; // Substitua pela URL correta da API
const API_KEY = "impactA2023!"; // Substitua pela sua chave de API

export const useConnectionState = (instanceId: string) => {
  const [connectionState, setConnectionState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/instance/connectionState/${instanceId}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: API_KEY,
            },
          }
        );
        setConnectionState(response.data.instance.state);
      } catch (error) {
        console.error("Erro ao verificar o estado da conexão:", error);
      } finally {
        setLoading(false);
      }
    }, 1000); // Verifica a cada 1 segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [instanceId]);

  return { connectionState, loading };
};