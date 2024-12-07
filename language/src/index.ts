// index.ts
// import fs from "fs";
// import { interpretProgram } from "./interpreter";
import { interpretAstHTTP, interpretVariablesHTTP } from "./routes";

// Executando as rotas HTTP, vindas de routes.ts
interpretVariablesHTTP();
interpretAstHTTP();

/*
export const main = () => {
  try {
    // Ler o conteúdo do arquivo .prg
    const input = fs.readFileSync("src/test/test.prg", "utf8");
    // Passa o conteúdo para o interpretador executar
    return interpretProgram(input);
  } catch (error) {
    console.error("Erro durante a leitura do arquivo. ", error);
    return { error: "Erro durante a leitura do arquivo. ", details: error };
  }
}; */
