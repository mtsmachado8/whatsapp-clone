import axios from "axios";

const API_BASE_URL = "https://evolution-api-5ywd.onrender.com"; // URL da Evolution API
const API_KEY = "impactA2023!"; // Substitua pela sua chave de API

const generateRandomInstanceName = (): string => {
  return `instance-${Math.random().toString(36).substr(2, 9)}`;
};

export const createInstance = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/instance/create`,
      {
        instanceName: generateRandomInstanceName(),
        qrcode: true,
        integration: "WHATSAPP-BAILEYS"
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
        },
      }
    );
    return response.data; // Retorna os dados da instância criada
  } catch (error) {
    console.error("Erro ao criar a instância:", error);
    throw error;
  }
};