import spl from "../../../../../public/media/svg/spl.svg";
import github from "../../../../../public/media/svg/github.svg";
import { Backnorym } from "./styles";
import { BNF } from "../modals/bnf";
import { useState } from "react";
import "./header.css";

export function Header() {
  const [openBNF, setOpenBNF] = useState(false);

  return (
    <>
      <header className="d-flex flex-column" style={{ gap: "2rem" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              style={{ userSelect: "none" }}
              src={spl}
              width={50}
              alt="SPL logo"
            />
            <h1>SPL</h1>
            <Backnorym className="text-monospace">
              Simple Programming Language
            </Backnorym>
          </div>
          <div className="d-flex align-items-center text-monospace">
            <div className="container mt-2">
              <button
                className="d-flex btn btn-primary"
                onClick={() => setOpenBNF(true)}
                style={{ cursor: "pointer" }}
              >
                BNF 📃
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
              >
                <u>Code</u>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MODAL */}

      <BNF
        openBNF={openBNF}
        onClose={() => setOpenBNF(false)}
        setOpenBNF={() => setOpenBNF(false)}
      />
    </>
  );
}
