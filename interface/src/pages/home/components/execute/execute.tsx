import axios from "axios";
import React, { useState } from "react";
import reset from "../../../../../public/media/svg/reset.svg";
import { handleRefreshClick } from "../function/refresh";

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
    <div className="container mt-5">
      <div className="mb-5">
        <button className="btn btn-primary" onClick={jsonButton}>
          Executar
        </button>
        <button className="btn btn-secondary ml-2" onClick={handleRefreshClick}>
          <img src={reset} alt="Reset" />
        </button>
      </div>
      {jsonMessage ? (
        /* Formatando o JSON da resposta do terminal */
        <pre
          className="text-light p-2 bg-dark border border-light d-flex"
          style={{ fontSize: "1.2rem", borderRadius: "20px" }}
        >
          {JSON.stringify(jsonMessage, null, 10)}
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
