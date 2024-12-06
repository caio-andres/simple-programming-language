import axios from "axios";
import React, { useState } from "react";
import reset from "../../../../../public/media/svg/reset.svg";
import { handleRefreshClick } from "../function/refresh";
import ReactJson from "react-json-view";

const serverPort = 3000;

export const Execute: React.FC = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const [json, setJson] = useState<object>({});

  // Devolver o JSON na página
  const execute = async () => {
    try {
      const response = await axios.post(`http://localhost:${serverPort}/read`, {
        code: textAreaValue, // O texto do textarea deve estar nesta variável
      });
      setJson(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do servidor:", err);
    }
  };

  return (
    <div className="container mt-5">
      <textarea
        className="form-control mb-3"
        rows={15}
        placeholder="Digite o seu código SPL aqui..."
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      />
      <div className="mb-5">
        <button className="btn btn-primary" onClick={execute}>
          Executar
        </button>
        <button className="btn btn-secondary ml-2" onClick={handleRefreshClick}>
          <img src={reset} alt="Reset" />
        </button>
      </div>

      {json ? (
        /* Formatando o JSON da resposta do terminal */
        <pre className="d-flex justify-content-center">
          <ReactJson
            src={json}
            style={{ borderRadius: "10px", padding: "0.4rem" }}
            theme="google"
          />
        </pre>
      ) : (
        <div className="alert alert-danger" role="alert">
          <strong>Erro:</strong> há um problema na sintaxe.
        </div>
      )}
    </div>
  );
};
