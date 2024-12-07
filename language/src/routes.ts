import express from "express";
import cors from "cors";
import {
  interpretProgramAst,
  interpretProgramVariables,
} from "./interpreter.ts";
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
export const interpretAstHTTP = () => {
  app.post("/interpret-ast", (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res.status(400).send({ error: "Nenhum código json enviado." });
    }

    try {
      ASTNodeCounter.resetId();
      res.send(interpretProgramAst(code));
    } catch (err) {
      console.error("Erro ao ler código de interpretJsonHTTP:", err);
    }
  });
};

export const interpretVariablesHTTP = () => {
  app.post("/interpret-variables", (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .send({ error: "Nenhum código variables enviado." });
    }

    try {
      const output = interpretProgramVariables(code);
      res.send(output);
    } catch (err) {
      console.error("Erro ao ler código de interpretVariablesHTTP:", err);
    }
  });
};
