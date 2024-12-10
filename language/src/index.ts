// index.ts
// import fs from "fs";
// import { interpretProgram } from "./interpreter";
import app from "./routes";

// Porta padrão do Vercel: process.env.PORT
const port = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});

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
