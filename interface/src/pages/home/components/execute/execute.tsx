import reset from "../../../../../public/media/svg/reset.svg";
import axios from "axios";
import ReactJson from "react-json-view";
import React, { useState } from "react";
import { handleRefreshClick } from "../function/refresh";
import { Main } from "./style";

const serverPort = 3000;

export const Execute: React.FC = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const [json, setJson] = useState<object>({});
  const [variables, setVariables] = useState<string[]>([]);

  // Devolver o JSON na página
  const executeJson = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${serverPort}/interpret-ast`,
        {
          code: textAreaValue,
        }
      );
      setJson(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do servidor em json:", err);
    }
  };

  const executeVariables = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${serverPort}/interpret-variables`,
        {
          code: textAreaValue,
        }
      );
      setVariables(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do servidor em variables:", err);
    }
  };

  return (
    <Main className="container mt-5 d-flex text-monospace">
      <div className="container d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h2>Editor</h2>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                executeJson();
                executeVariables();
              }}
            >
              Executar
            </button>
            <button
              className="btn btn-secondary ml-1"
              onClick={handleRefreshClick}
            >
              <img src={reset} alt="Reset" />
            </button>
          </div>
        </div>
        <textarea
          className="form-control mb-3"
          style={{ height: "250px" }}
          placeholder="Digite o seu código SPL aqui... ✍🏻"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />
      </div>

      <div className="container d-flex flex-column">
        {variables && json ? (
          <>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <h2>Resultado</h2>
              </div>
              <div
                className="p-3 bg-dark rounded"
                style={{
                  border: "1px solid #727272",
                  textAlign: "left",
                  height: "250px",
                  maxHeight: "610px",
                  overflow: "auto",
                }}
              >
                {variables.map((result, index) => (
                  <React.Fragment key={index}>
                    {result}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="mt-3" style={{ textAlign: "left" }}>
              <h2>AST</h2>
              <div className="rounded">
                <ReactJson
                  displayObjectSize
                  src={json}
                  style={{
                    maxHeight: "200px",
                    overflow: "auto",
                    borderRadius: "10px",
                    padding: "0.4rem",
                    border: "1px solid #30323b",
                    borderBottom: "5px solid #595a5f",
                  }}
                  theme="google"
                />
              </div>
            </div>
          </>
        ) : (
          <div
            className="alert alert-danger d-flex justify-content-center mt-5"
            role="alert"
          >
            <strong>Erro:</strong>&nbsp;há um erro na sintaxe.
          </div>
        )}
      </div>
    </Main>
  );
};
