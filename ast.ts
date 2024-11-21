// Type que define os NodeType
export type NodeType =
  | "Program" // Programa
  | "NumericLiteral" // Números literais
  | "Identifier" // Identificadores (nomes de variáveis, por exemplo)
  | "BinaryExpr"; // Expressões binárias (1 + 2, a + b) : 1 = operando | + = operador binário

// Interface que define declarações na AST
export interface Statement {
  kind: NodeType;
}

// Interface que define o programa, se extendendo da declaração 'Statement'
export interface Program extends Statement {
  kind: "Program";
  body: Statement[];
}

export interface Expr extends Statement {}

export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string;
}

export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}
