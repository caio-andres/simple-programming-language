// deno-lint-ignore-file no-explicit-any
import {
  Statement,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
  NullLiteral,
} from "./ast.ts";

import { tokenize, Token, TokenType } from "./lexer.ts";

export default class Parser {
  private tokens: Token[] = []; // Lista de tokens processados pelo lexer

  // Verifica se ainda não chegou ao fim do arquivo (EOF)
  private not_eof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  // Retorna o token atual sem consumi-lo
  private at() {
    return this.tokens[0] as Token;
  }

  // Avança para o próximo token, retornando o atual
  private eat() {
    const prev = this.tokens.shift() as Token; // Remove o primeiro token da lista
    return prev; // Retorna o token removido
  }

  // Consome o próximo token, verificando se ele é do tipo esperado
  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token; // Avança para o próximo token
    if (!prev || prev.type != type) {
      // Se o tipo não corresponder, exibe um erro e encerra
      console.error(
        "Erro de análise (parser):\n",
        err,
        prev,
        " - Esperado: ",
        type
      );
      Deno.exit(1); // Encerra o programa
    }

    return prev; // Retorna o token esperado
  }

  // Método principal do parser: converte o código fonte em uma AST
  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode); // Gera tokens a partir do código-fonte
    const program: Program = {
      kind: "Program", // Define o tipo do nó principal
      body: [], // Lista de instruções do programa
    };

    // Processa todos os tokens até o fim do arquivo
    while (this.not_eof()) {
      program.body.push(this.parse_statement()); // Adiciona uma declaração à lista do programa
    }

    return program; // Retorna a AST completa
  }

  // Analisa uma declaração (neste caso, apenas expressões são suportadas)
  private parse_statement(): Statement {
    return this.parse_expr(); // Um statement é tratado como uma expressão
  }

  // Analisa uma expressão genérica
  private parse_expr(): Expr {
    return this.parse_additive_expr(); // Inicia pelo nível mais alto da precedência
  }

  // Analisa expressões com operadores '+' e '-'
  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicative_expr(); // Analisa o lado esquerdo

    // Enquanto o próximo token for '+' ou '-', continua combinando
    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value; // Consome o operador
      const right = this.parse_multiplicative_expr(); // Analisa o lado direito
      left = {
        kind: "BinaryExpr", // Cria um nó de expressão binária
        left, // Lado esquerdo
        right, // Lado direito
        operator, // Operador
      } as BinaryExpr;
    }

    return left; // Retorna o resultado combinado
  }

  // Analisa expressões com '*' '/' '%'
  private parse_multiplicative_expr(): Expr {
    let left = this.parse_primary_expr(); // Analisa o lado esquerdo

    // Continua enquanto os operadores de multiplicação/divisão/modulo forem encontrados
    while (
      this.at().value == "/" ||
      this.at().value == "*" ||
      this.at().value == "%"
    ) {
      const operator = this.eat().value; // Consome o operador
      const right = this.parse_primary_expr(); // Analisa o lado direito
      left = {
        kind: "BinaryExpr", // Cria um nó de expressão binária
        left, // Lado esquerdo
        right, // Lado direito
        operator, // Operador
      } as BinaryExpr;
    }

    return left; // Retorna o resultado combinado
  }

  /**
   * Ordem de precedência das operações:
   * 1. Parênteses
   * 2. Operadores de multiplicação/divisão/módulo
   * 3. Operadores de adição/subtração
   */

  // Analisa valores primários, como números, identificadores ou expressões entre parênteses
  private parse_primary_expr(): Expr {
    const tk = this.at().type; // Obtém o tipo do token atual

    switch (tk) {
      case TokenType.Identifier: // Identificadores (nomes de variáveis)
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;

      case TokenType.Null: // Valor nulo (palavra-chave 'null')
        this.eat(); // Consome o token
        return { kind: "NullLiteral", value: "null" } as NullLiteral;

      case TokenType.Number: // Literais numéricos
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value), // Converte para número
        } as NumericLiteral;

      case TokenType.OpenParen: {
        this.eat(); // Consome o parêntese aberto
        const value = this.parse_expr(); // Analisa a expressão interna
        this.expect(
          TokenType.CloseParen, // Espera o parêntese fechado
          "Token inesperado encontrado dentro da expressão entre parênteses. Fecha parênteses esperado."
        );
        return value; // Retorna a expressão interna
      }

      default: // Token inesperado, exibe erro e encerra
        console.error(
          "Um token inesperado foi encontrado durante a análise:",
          this.at()
        );
        Deno.exit(1); // Encerra o programa
    }
  }
}
