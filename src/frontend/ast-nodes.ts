export type NodeType =
  // DECLARAÇÕES
  | "Program" // Programa
  | "VarDeclaration" // Declaração de variável
  | "FunctionDeclaration" // Declaração de função
  // EXPRESSÕES
  | "AssignmentExpr" // Expressão de atribuição
  | "MemberExpr" // Expressão de membro
  | "CallExpr" // Expressão de chamada
  // Literais
  | "Property" // Propriedade
  | "ObjectLiteral" // Literal de objeto
  | "NumericLiteral" // Literal numérico
  | "Identifier" // Identificador
  | "BinaryExpr"; // Expressão binária

/**
 * Declarações não resultam em um valor em tempo de execução.
 * Elas contêm uma ou mais expressões internamente.
 */
export interface Stmt {
  kind: NodeType;
}

/**
 * Define um bloco que contém várias declarações.
 * - Somente um programa será contido em um arquivo.
 */
export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

export interface VarDeclaration extends Stmt {
  kind: "VarDeclaration";
  constant: boolean;
  identifier: string;
  value?: Expr;
}

export interface FunctionDeclaration extends Stmt {
  kind: "FunctionDeclaration";
  parameters: string[];
  name: string;
  body: Stmt[];
}

/** Expressões resultarão em um valor em tempo de execução, ao contrário das Declarações */
export interface Expr extends Stmt {}

export interface AssignmentExpr extends Expr {
  kind: "AssignmentExpr";
  assigne: Expr;
  value: Expr;
}

/**
 * Uma operação com dois lados separados por um operador.
 * Ambos os lados podem ser QUALQUER expressão complexa.
 * - Operadores suportados -> + | - | / | * | %
 */
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string; // precisa ser do tipo BinaryOperator
}

export interface CallExpr extends Expr {
  kind: "CallExpr";
  args: Expr[];
  caller: Expr;
}

export interface MemberExpr extends Expr {
  kind: "MemberExpr";
  object: Expr;
  property: Expr;
  computed: boolean;
}

// TIPOS DE LITERAL / EXPRESSÕES PRIMÁRIAS
/**
 * Representa uma variável ou símbolo definido pelo usuário no código fonte.
 */
export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

/**
 * Representa uma constante numérica dentro do código fonte.
 */
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}

export interface Property extends Expr {
  kind: "Property";
  key: string;
  value?: Expr;
}

export interface ObjectLiteral extends Expr {
  kind: "ObjectLiteral";
  properties: Property[];
}
