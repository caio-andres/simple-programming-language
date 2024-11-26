import {
  AssignmentExpr,
  BinaryExpr,
  CallExpr,
  Identifier,
  ObjectLiteral,
} from "../../frontend/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import {
  FunctionValue,
  MK_NULL,
  NativeFnValue,
  NumberVal,
  ObjectVal,
  RuntimeVal,
} from "../values.ts";

// Avalia expressões binárias numéricas (operações como +, -, *, /, %)
function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string
): NumberVal {
  let result: number;
  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    // Verificação futura para divisão por zero
    result = lhs.value / rhs.value;
  } else {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "number" };
}

// Avalia expressões binárias (operações entre dois valores)
export function eval_binary_expr(
  binop: BinaryExpr,
  env: Environment
): RuntimeVal {
  const lhs = evaluate(binop.left, env); // Avalia o lado esquerdo
  const rhs = evaluate(binop.right, env); // Avalia o lado direito

  // Apenas suporta operações entre números por enquanto
  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator
    );
  }

  // Retorna null caso não seja suportado
  return MK_NULL();
}

// Retorna o valor de uma variável pelo seu nome (identificador)
export function eval_identifier(
  ident: Identifier,
  env: Environment
): RuntimeVal {
  return env.lookupVar(ident.symbol);
}

// Avalia uma expressão de atribuição (ex: x = 5)
export function eval_assignment(
  node: AssignmentExpr,
  env: Environment
): RuntimeVal {
  // Valida se o lado esquerdo é um identificador válido
  if (node.assigne.kind !== "Identifier") {
    throw `Invalid LHS inside assignment expr ${JSON.stringify(node.assigne)}`;
  }

  const varname = (node.assigne as Identifier).symbol;
  // Atribui o valor avaliado ao identificador
  return env.assignVar(varname, evaluate(node.value, env));
}

// Avalia objetos literais e inicializa suas propriedades
export function eval_object_expr(
  obj: ObjectLiteral,
  env: Environment
): RuntimeVal {
  const object = { type: "object", properties: new Map() } as ObjectVal;

  // Itera pelas propriedades e avalia seus valores
  for (const { key, value } of obj.properties) {
    const runtimeVal =
      value == undefined ? env.lookupVar(key) : evaluate(value, env);

    object.properties.set(key, runtimeVal);
  }

  return object;
}

// Avalia chamadas de funções (nativas ou declaradas)
export function eval_call_expr(expr: CallExpr, env: Environment): RuntimeVal {
  // Avalia os argumentos da função
  const args = expr.args.map((arg) => evaluate(arg, env));
  // Avalia o próprio identificador da função
  const fn = evaluate(expr.caller, env);

  // Chama funções nativas, se aplicável
  if (fn.type == "native-fn") {
    return (fn as NativeFnValue).call(args, env);
  }

  // Chama funções declaradas na linguagem
  if (fn.type == "function") {
    const func = fn as FunctionValue;
    const scope = new Environment(func.declarationEnv);

    // Declara variáveis correspondentes aos parâmetros da função
    for (let i = 0; i < func.parameters.length; i++) {
      scope.declareVar(func.parameters[i], args[i], false);
    }

    let result: RuntimeVal = MK_NULL();

    // Avalia o corpo da função linha por linha
    for (const stmt of func.body) {
      result = evaluate(stmt, scope);
    }

    return result;
  }

  // Erro caso o valor chamado não seja uma função
  throw "Cannot call value that is not a function: " + JSON.stringify(fn);
}
