import {
  Statement,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
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
    return this.parse_primary_expr();
  }

  private parse_primary_expr(): Expr {
    const tk = this.at().type;

    switch (tk) {
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;
      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value),
        } as NumericLiteral;
      default:
        console.error(
          "Um token inesperado encontrado durante a análise:",
          this.at()
        );
        Deno.exit(1);
    }
  }
}
