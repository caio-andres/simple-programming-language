// Type que define os NodeType
export type NodeType =
  | "Program" // Programa
  | "NumericLiteral" // Números
  | "NullLiteral" // Null
  | "Identifier" // Identificadores (nomes de variáveis, por exemplo)
  | "BinaryExpr"; // Expressões binárias (1 + 2, a + b) : 1 = operando | + = operador binário

// Interface que define declarações na AST
export interface Statement {
  kind: NodeType;
}

// Interface que define o programa
export interface Program extends Statement {
  kind: "Program";
  body: Statement[];
}

// Interface que é definido como um tipo de Statement, servindo de base para outras expressões
export interface Expr extends Statement {}

// Interface que define a expressão binária
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr; // À esquerda da expressão binária, averá um valor do tipo 'Expr'
  right: Expr; // À direita da expressão binária, averá um valor do tipo 'Expr'
  operator: string; // Operador
}

// Interface que define o identificador
export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string; // Símbolo
}

// Interface que define o número literal
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}

// Interface que define null
export interface NullLiteral extends Expr {
  kind: "NullLiteral";
  value: "null";
}
