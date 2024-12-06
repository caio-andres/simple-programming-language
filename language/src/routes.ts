import express from "express";
import cors from "cors";
import { main } from "./index.ts";
import { exec } from "childprocess";

const app = express();
app.use(cors());

const port = 3000;

// Porta localhost (3000) e rota
app.listen(port, () => {
  console.log(`Server na porta: ${port}`);
});

// Executar o resultado do terminal
export const executeHTTP = () => {
  app.get("/execute", (req, res) => {
    const output = main();
    res.send(output);
  });
};

export const refreshHTTP = () => {
  app.get("/refresh", (req, res) => {
    exec("npm start");
  });
};
