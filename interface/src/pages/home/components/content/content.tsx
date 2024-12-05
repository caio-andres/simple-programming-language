import spl from "../../../../../public/media/svg/spl.svg";
import github from "../../../../../public/media/svg/github.svg";
import { Backnorym } from "./styles";
import "./content.css";
import { Commands } from "../modals/commands";
import { useState } from "react";

export function Content() {
  const [openCommands, setOpenCommands] = useState(false);

  return (
    <>
      <main className="d-flex flex-column" style={{ gap: "2rem" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img src={spl} width={50} alt="SPL logo" />
            <h1>SPL</h1>
            <Backnorym className="text-monospace">
              Simple Programming Language
            </Backnorym>
          </div>
          <div className="d-flex align-items-center">
            <div className="container mt-2">
              <button
                className="d-flex btn btn-primary"
                onClick={() => setOpenCommands(true)}
                style={{ cursor: "pointer" }}
              >
                Comandos
              </button>
            </div>
            <div>
              <a
                href="https://github.com/caio-andres/simple-programming-language"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} width={50} alt="GitHub logo" />
              </a>
              <a
                href="https://github.com/caio-andres/simple-programming-language"
                target="_blank"
                rel="noopener noreferrer"
                className="text-monospace"
              >
                <u>Source</u>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}

      <Commands
        openCommands={openCommands}
        onClose={() => setOpenCommands(false)}
        setOpenCommands={() => setOpenCommands(false)}
      />
    </>
  );
}
