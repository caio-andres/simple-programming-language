import axios from "axios";
import React, { useState } from "react";
import reset from "../../../../../public/media/svg/reset.svg";
import { handleRefreshClick } from "../function/refresh";
import ReactJson from "react-json-view";

const serverPort = 3000;

export const Execute: React.FC = () => {
  const [jsonMessage, setJsonMessage] = useState<string>();
  const [parsedJson, setParsedJson] = useState<object>({});

  // Devolver o JSON na página
  const jsonButton = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${serverPort}/execute`
      );
      setJsonMessage(response.data);

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;
      setParsedJson(data);
    } catch (err) {
      console.error("Erro ao buscar dados do servidor:", err);
    }
  };

  const refreshButton = async () => {
    try {
      await axios.get(`http://localhost:${serverPort}/refresh`);
    } catch (err) {
      console.error("Erro ao dar refresh no terminal:", err);
    }
  };

  return (
    <div className="container mt-5 w-50">
      <div className="mb-5">
        <button className="btn btn-primary" onClick={jsonButton}>
          Executar
        </button>
        <button className="btn btn-secondary ml-2" onClick={refreshButton}>
          <img src={reset} alt="Reset" />
        </button>
      </div>
      {jsonMessage ? (
        /* Formatando o JSON da resposta do terminal */
        <ReactJson
          src={parsedJson}
          style={{ borderRadius: "10px" }}
          theme="google"
        />
      ) : (
        <div style={{ userSelect: "none" }}>
          <h4 className="font-4">⬆️</h4>
          <p className="text-monospace">Execute o código</p>
        </div>
      )}
    </div>
  );
};
