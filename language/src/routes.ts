import express, { Request, Response } from "express";
import cors from "cors";
import { interpretProgramAst, interpretProgramVariables } from "./interpreter";
import { ASTNodeCounter } from "./ast-nodes";

const app = express();

// Habilitando CORS e JSON middleware
app.use(cors());
app.use(express.json());

// Rotas para interpretar variáveis
app.post("/interpret-variables", (req: Request, res: any) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send({ error: "Nenhum código variables enviado." });
  }

  try {
    const output = interpretProgramVariables(code);
    res.send(output);
  } catch (err) {
    console.error(
      "Erro ao executar a requesição post de /interpret-variables:",
      err
    );
    res.status(500).send({ error: "Erro interno ao processar variáveis." });
  }
});

// Rotas para interpretar AST
app.post("/interpret-ast", (req: Request, res: any) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send({ error: "Nenhum código json enviado." });
  }

  try {
    ASTNodeCounter.resetId();
    res.send(interpretProgramAst(code));
  } catch (err) {
    console.error("Erro ao executar a requesição post de /interpret-ast:", err);
    res.status(500).send({ error: "Erro interno ao interpretar o AST." });
  }
});

export default app;
