// index.ts
import * as fs from "fs";
import { interpretProgram } from "./interpreter";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

const main = () => {
  try {
    // Ler o conteúdo do arquivo .prg
    const input = fs.readFileSync("src/test/test.prg", "utf8");

    // Passa o conteúdo para o interpretador executar
    return interpretProgram(input);
  } catch (error) {
    console.error("Erro durante a leitura do arquivo. ", error);
    return { error: "Erro durante a leitura do arquivo. ", details: error };
  }
};

// Porta localhost (3000) e rota
app.listen(port, () => {
  console.log(`Server na porta: ${port}`);
});

// Executar o resultado do terminal
app.get("/execute", (req, res) => {
  const output = main();
  res.send(output);
});
