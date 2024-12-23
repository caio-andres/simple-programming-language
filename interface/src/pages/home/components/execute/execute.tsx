import reset from "../../../../../public/media/svg/reset.svg";
import axios from "axios";
import { darkColorspace, JsonViewer } from "@textea/json-viewer";
import React, { useState } from "react";
import { handleRefreshClick } from "../function/refresh";
import { Exemplos, Main } from "./style";
import { toast } from "react-toastify";

// const serverPort = 3000;

export const Execute: React.FC = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const [json, setJson] = useState<object>({});
  const [variables, setVariables] = useState<string[]>([]);

  // Devolver o JSON na página
  const executeJson = async () => {
    try {
      const response = await axios.post(
        `https://simple-programming-language.vercel.app/interpret-ast`,
        {
          code: textAreaValue,
        }
      );
      setJson(response.data);
    } catch (err: unknown) {
      // Notificação com toast
      toast.error("Você deve escrever algum comando.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      console.error("Erro ao buscar dados do servidor em json:", err);
    }
  };

  const executeVariables = async () => {
    try {
      const response = await axios.post(
        `https://simple-programming-language.vercel.app/interpret-variables`,
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
    <>
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
            style={{
              height: "250px",
              backgroundColor: "#171c29",
              color: "#FFF",
              border: "1px solid #727272",
            }}
            placeholder="Digite o seu código SPL aqui... ✍🏻"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
          <div
            className="d-flex flex-column mb-3"
            style={{ textAlign: "left" }}
          >
            <h2>Exemplos:</h2>
            <Exemplos className="d-flex justify-content-between">
              <div
                className="d-flex flex-column rounded p-2"
                style={{
                  border: "1px solid #686666",
                  backgroundColor: "#171C29",
                }}
              >
                <h5>PRINT</h5>
                <code>x = 1;</code>
                <code>y = x;</code>
                <code>z = x * (10 + y);</code>
              </div>
              <div
                className="d-flex flex-column rounded p-2"
                style={{
                  border: "1px solid #686666",
                  backgroundColor: "#171C29",
                }}
              >
                <h5>WHILE/DO</h5>
                <code>x = 1;</code>
                <code>loop 10 {">"} x until</code>
                <code>&nbsp;&nbsp;x = x + 1;</code>
                <code>;</code>
              </div>
              <div
                className="d-flex flex-column rounded p-2"
                style={{
                  border: "1px solid #686666",
                  backgroundColor: "#171C29",
                }}
              >
                <h5>IF / ELSE</h5>
                <code>x = 1;</code>
                <code>check x == 10 then</code>
                <code>&nbsp;&nbsp;y = 10;</code>
                <code>or</code>
                <code>&nbsp;&nbsp;y = 20;</code>
                <code>;</code>
              </div>
            </Exemplos>
          </div>
        </div>
        <div className="container d-flex flex-column">
          {variables && json ? (
            <>
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <h2>Resultado</h2>
                </div>
                <div
                  className="p-3 rounded"
                  style={{
                    backgroundColor: "#1D1F21",
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
                  <JsonViewer
                    value={json}
                    theme={darkColorspace}
                    style={{
                      maxHeight: "200px",
                      overflow: "auto",
                      borderRadius: "10px",
                      padding: "0.4rem",
                      border: "1px solid #30323b",
                      borderBottom: "5px solid #595a5f",
                    }}
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

      {/* Toast */}
    </>
  );
};
