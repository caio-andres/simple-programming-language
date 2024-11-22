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
  private tokens: Token[] = [];

  private not_eof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  private at() {
    return this.tokens[0] as Token;
  }

  private eat() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error(
        "Erro de análise (parser):\n",
        err,
        prev,
        " - Esperado: ",
        type
      );
      Deno.exit(1);
    }

    return prev;
  }

  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode);
    const program: Program = {
      kind: "Program",
      body: [],
    };

    while (this.not_eof()) {
      program.body.push(this.parse_statement());
    }

    return program;
  }

  private parse_statement(): Statement {
    return this.parse_expr();
  }

  private parse_expr(): Expr {
    return this.parse_additive_expr();
  }

  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicative_expr();

    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parse_multiplicative_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  private parse_multiplicative_expr(): Expr {
    let left = this.parse_primary_expr();

    while (
      this.at().value == "/" ||
      this.at().value == "*" ||
      this.at().value == "%"
    ) {
      const operator = this.eat().value;
      const right = this.parse_primary_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  /**
   * Ordem de precedência:
   * 1. Primeira expressão
   * 2. Multiplicação
   * 3. Adição
   */

  private parse_primary_expr(): Expr {
    const tk = this.at().type;

    switch (tk) {
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;

      case TokenType.Null:
        this.eat(); // Avança keyword
        return { kind: "NullLiteral", value: null } as NullLiteral;

      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value),
        } as NumericLiteral;

      case TokenType.OpenParen: {
        this.eat(); // Consome o parênteses aberto
        const value = this.parse_expr();
        this.expect(
          TokenType.CloseParen,
          "Token inesperado encontrado dentro da expressão entre parênteses. Fecha parênteses esperado."
        ); // Fecha parênteses
        return value;
      }

      default:
        console.error(
          "Um token inesperado foi encontrado durante a análise:",
          this.at()
        );
        Deno.exit(1);
    }
  }
}
