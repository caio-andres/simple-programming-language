import { Lexer, TokenType } from "./lexer";
import { Parser } from "./parser";
import { ExecutionContext, executeAST } from "./executions";
import {
  BinaryOpNode,
  NumberNode,
  IfNode,
  ConditionalNode,
  AssignmentNode,
  NameNode,
} from "./ast-nodes";

// Função para converter um nó da AST em JSON
function astNodeToJson(node: any): any {
  if (!node) return null;

  if (node instanceof BinaryOpNode) {
    return {
      type: "BinaryOpNode",
      operator: node.operator,
      left: astNodeToJson(node.left),
      right: astNodeToJson(node.right),
    };
  }

  if (node instanceof NumberNode) {
    return {
      type: "NumberNode",
      value: node.value,
    };
  }

  if (node instanceof IfNode) {
    return {
      type: "IfNode",
      condition: astNodeToJson(node.condition),
      thenBranch: astNodeToJson(node.thenBranch),
      elseBranch: astNodeToJson(node.elseBranch),
    };
  }

  if (node instanceof AssignmentNode) {
    return {
      type: "AssignmentNode",
      name: node.name,
      value: node.value,
    };
  }

  if (node instanceof NameNode) {
    return {
      type: {
        id: node.id,
        typeName: node.type,
        value: node.value,
      },
    };
  }

  if (node instanceof ConditionalNode) {
    return {
      type: "ConditionalNode",
      operator: node.operator,
      left: astNodeToJson(node.left),
      right: astNodeToJson(node.right),
    };
  }

  // Caso existam outros tipos de nós, eles devem ser tratados aqui
  return {
    type: "UnknownNode",
    details: node,
  };
}

// Função para interpretar o conteúdo do programa da AST em JSON
export function interpretProgramAst(input: string) {
  try {
    const context = new ExecutionContext();
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const astNodes = [];
    while (lexer.lookAhead().type !== TokenType.EOF) {
      const astNode = parser.parse();
      astNodes.push(astNodeToJson(astNode));
      console.log("ast node ", astNode);
      executeAST(astNode, context);
    }

    // Exibir o JSON da AST
    const astJson = JSON.stringify(astNodes, null, 2);
    // console.log("AST em JSON:");
    // console.log(astJson);

    return astJson;
  } catch (error) {
    console.error("Erro durante a execução de astJson:");
    console.error(error);
  }
}

// Função para interpretar o conteúdo do programa do resultado das variáveis ([key: string]: number)
export function interpretProgramVariables(input: string) {
  try {
    const context = new ExecutionContext();
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const astNodes = [];
    while (lexer.lookAhead().type !== TokenType.EOF) {
      const astNode = parser.parse();
      astNodes.push(astNodeToJson(astNode));
      executeAST(astNode, context);
    }

    console.log("Valores das variáveis:");
    for (const [name, value] of Object.entries(context["variables"])) {
      console.log(`${name}: ${value}`);
    }

    const variablesValues = Object.entries(context["variables"]).map(
      ([name, value]) => `${name}: ${value}`
    );

    return variablesValues;
  } catch (error) {
    console.error("Erro durante a execução de variablesValues:");
    console.error(error);
  }
}
