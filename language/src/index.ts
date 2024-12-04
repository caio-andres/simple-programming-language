// index.ts
import * as fs from "fs";
import { interpretProgram } from "./interpreter";

function main() {
  try {
    // Ler o conteúdo do arquivo .prg
    const input = fs.readFileSync("src/test/test.prg", "utf8");

    // Passa o conteúdo para o interpretador executar
    interpretProgram(input);
  } catch (error) {
    console.error("Erro durante a leitura do arquivo:");
    console.error(error);
  }
}

main();
