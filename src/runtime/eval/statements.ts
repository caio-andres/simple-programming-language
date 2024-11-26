import {
  FunctionDeclaration,
  Program,
  VarDeclaration,
} from "../../frontend/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { FunctionValue, MK_NULL, RuntimeVal } from "../values.ts";

// Avalia o programa principal executando as instruções na ordem
export function eval_program(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MK_NULL(); // Armazena o último valor avaliado
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env); // Avalia cada instrução no ambiente
  }
  return lastEvaluated; // Retorna o valor da última instrução
}

// Avalia declarações de variáveis, incluindo constantes
export function eval_var_declaration(
  declaration: VarDeclaration,
  env: Environment
): RuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env) // Avalia o valor inicial, se houver
    : MK_NULL(); // Caso contrário, define como null

  // Declara a variável no ambiente
  return env.declareVar(declaration.identifier, value, declaration.constant);
}

// Avalia declarações de funções, armazenando-as no ambiente
export function eval_function_declaration(
  declaration: FunctionDeclaration,
  env: Environment
): RuntimeVal {
  // Cria uma representação da função
  const fn = {
    type: "function",
    name: declaration.name,
    parameters: declaration.parameters,
    declarationEnv: env, // Ambiente onde foi declarada
    body: declaration.body, // Corpo da função
  } as FunctionValue;

  // Declara a função como uma constante no ambiente
  return env.declareVar(declaration.name, fn, true);
}
