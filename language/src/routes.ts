import express from "express";
import cors from "cors";
import { interpretProgram } from "./interpreter.ts";
import { ASTNodeCounter } from "./ast-nodes.ts";

const app = express();

// Habilitando cors e o middleware
app.use(cors(), express.json());

const port = 3000;

// Porta localhost (3000) e rota
app.listen(port, () => {
  console.log(`Server na porta: ${port}`);
});

// Interpretar textarea presente no frontend
export const readHTTP = () => {
  app.post("/read", (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res.status(400).send({ error: "Nenhum código enviado." });
    }

    try {
      ASTNodeCounter.resetId();
      const output = interpretProgram(code);
      res.send(output);
    } catch (err) {
      console.error("Erro ao ler código:", err);
    }
  });
};
