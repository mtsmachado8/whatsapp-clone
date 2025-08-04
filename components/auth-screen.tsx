import { useState, useEffect } from "react";
import { createInstance } from "@/hooks/use-evo-qrcode"; // Certifique-se de que o caminho está correto
import { useConnectionState } from "@/hooks/use-connection-state";
import { FaSpinner } from "react-icons/fa"; // Biblioteca de ícones (instale com `npm install react-icons`)

interface AuthScreenProps {
  onAuthenticated: () => void; // Ajuste o tipo conforme necessário
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const { connectionState } = useConnectionState(instanceId || "");

  // Recupera o instanceName do Local Storage apenas no cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInstanceId = localStorage.getItem("instanceName");
      if (storedInstanceId) {
        setInstanceId(storedInstanceId);
      }
    }
  }, []);
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        const response = await createInstance();
        setQrCode(response.qrcode.base64); // Define o QR Code em base64
        setInstanceId(response.instance.instanceName); // Salva o ID da instância
      } catch (err) {
        setError("Erro ao gerar o QR Code.");
      } finally {
        setLoading(false);
      }
    };

    if (!instanceId) {
      fetchQRCode();
    }
  }, [instanceId]);

  useEffect(() => {
    if (connectionState === "open") {
      if (typeof window !== "undefined") {
        localStorage.setItem("instanceName", instanceId || ""); // Salva o instanceName no Local Storage
      }
      onAuthenticated(); // Chama a função de autenticação quando a conexão for bem-sucedida
    }
  }, [connectionState, onAuthenticated, instanceId]);

  return (
    <div className="min-h-screen whatsapp-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="whatsapp-sidebar rounded-2xl p-8 shadow-lg border whatsapp-border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Instructions */}
            <div className="space-y-8">
              <h2 className="text-2xl font-medium whatsapp-text mb-6">Etapas para acessar</h2>
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      Abra o <strong>WhatsApp Business</strong> no seu celular.
                    </p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      No Android, toque em <strong>Mais opções</strong>. No iPhone, toque em <strong>Configurações</strong>.
                    </p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      Toque em <strong>Dispositivos conectados</strong> e, em seguida, em <strong>Conectar dispositivo</strong>.
                    </p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium whatsapp-text">4</span>
                  </div>
                  <div className="flex-1">
                    <p className="whatsapp-text">
                      <strong>Escaneie o QR code</strong> para confirmar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="flex flex-col items-center space-y-6">
              {loading ? (
                <p>Carregando QR Code...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : qrCode ? (
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              ) : (
                <p>QR Code não disponível.</p>
              )}

              {connectionState === "connecting" && (
                <div className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin text-xl whatsapp-text" />
                  <p className="whatsapp-text">Conectando...</p>
                </div>
              )}

              {connectionState === "open" && (
                <p className="text-green-500">Conexão estabelecida com sucesso!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}