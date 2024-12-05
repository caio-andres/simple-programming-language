import axios from "axios";
import React, { useState } from "react";

const serverPort = 3000;

export const Execute: React.FC = () => {
  const [jsonMessage, setJsonMessage] = useState<string>();

  // Devolver o JSON na página
  const jsonButton = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${serverPort}/execute`
      );
      setJsonMessage(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do servidor:", err);
    }
  };

  return (
    <div className="mt-5">
      <button className="btn btn-secondary mb-5" onClick={jsonButton}>
        Executar
      </button>

      {/* Formatando o JSON da resposta do terminal */}
      {jsonMessage ? (
        <pre className="text-light p-2 bg-dark">
          {JSON.stringify(jsonMessage, null, 2)}
        </pre>
      ) : (
        <div style={{ userSelect: "none" }}>
          <h4 className="font-4">⬆️</h4>
          <p className="text-monospace">Execute o código</p>
        </div>
      )}
    </div>
  );
};
