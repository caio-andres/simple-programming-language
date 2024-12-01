// deno-lint-ignore-file no-explicit-any
import {
  AssignmentExpr,
  BinaryExpr,
  CallExpr,
  Expr,
  Identifier,
  MemberExpr,
  NumericLiteral,
  ObjectLiteral,
  Program,
  Property,
  Stmt,
  VarDeclaration,
  FunctionDeclaration,
} from "./ast-nodes.ts";

import { Token, tokenize, TokenType } from "./lexer.ts";

export default class Parser {
  private tokens: Token[] = [];

  /*
   * Determina se a análise está completa e o END OF FILE está completo
   */
  private not_eof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  /**
   * Retorna o atual token disponível
   */
  private at() {
    return this.tokens[0] as Token;
  }

  /**
   * Retorna o token anterior e depois avança para o próximo valor do array tokens
   */
  private eat() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  /**
   * Verifica o tipo do token experado e lança uma exceção se o valor não combina
   */
  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
      process.exit(1);
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
      program.body.push(this.parse_stmt());
    }

    return program;
  }

  private parse_stmt(): Stmt {
    switch (this.at().type) {
      case TokenType.Let:
      case TokenType.Const:
        return this.parse_var_declaration();
      case TokenType.Fn:
        return this.parse_fn_declaration();
      default:
        return this.parse_expr();
    }
  }

  parse_fn_declaration(): Stmt {
    this.eat();
    const name = this.expect(
      TokenType.Identifier,
      "Expected function name following fn keyword"
    ).value;

    const args = this.parse_args();
    const params: string[] = [];
    for (const arg of args) {
      if (arg.kind !== "Identifier") {
        console.log(arg);
        throw "Inside function declaration expected parameters to be of type string.";
      }

      params.push((arg as Identifier).symbol);
    }

    this.expect(
      TokenType.OpenBrace,
      "Expected function body following declaration"
    );
    const body: Stmt[] = [];

    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CloseBrace
    ) {
      body.push(this.parse_stmt());
    }

    this.expect(
      TokenType.CloseBrace,
      "Closing brace expected inside function declaration"
    );

    const fn = {
      body,
      name,
      parameters: params,
      kind: "FunctionDeclaration",
    } as FunctionDeclaration;

    return fn;
  }

  parse_var_declaration(): Stmt {
    const isConstant = this.eat().type == TokenType.Const;
    const identifier = this.expect(
      TokenType.Identifier,
      "Expected identifier name following let | const keywords."
    ).value;

    if (this.at().type == TokenType.Semicolon) {
      this.eat(); // expect semicolon
      if (isConstant) {
        throw "Must assigne value to constant expression. No value provided.";
      }

      return {
        kind: "VarDeclaration",
        identifier,
        constant: false,
      } as VarDeclaration;
    }

    this.expect(
      TokenType.Equals,
      "Expected equals token following identifier in var declaration."
    );

    const declaration = {
      kind: "VarDeclaration",
      value: this.parse_expr(),
      identifier,
      constant: isConstant,
    } as VarDeclaration;

    this.expect(
      TokenType.Semicolon,
      "Variable declaration statment must end with semicolon."
    );

    return declaration;
  }

  private parse_expr(): Expr {
    return this.parse_assignment_expr();
  }

  private parse_assignment_expr(): Expr {
    const left = this.parse_object_expr();

    if (this.at().type == TokenType.Equals) {
      this.eat();
      const value = this.parse_assignment_expr();
      return { value, assigne: left, kind: "AssignmentExpr" } as AssignmentExpr;
    }

    return left;
  }

  private parse_object_expr(): Expr {
    if (this.at().type !== TokenType.OpenBrace) {
      return this.parse_additive_expr();
    }

    this.eat();
    const properties = new Array<Property>();

    while (this.not_eof() && this.at().type != TokenType.CloseBrace) {
      const key = this.expect(
        TokenType.Identifier,
        "Object literal key expected"
      ).value;

      if (this.at().type == TokenType.Comma) {
        this.eat(); // advance past comma
        properties.push({ key, kind: "Property" } as Property);
        continue;
      } else if (this.at().type == TokenType.CloseBrace) {
        properties.push({ key, kind: "Property" });
        continue;
      }

      this.expect(
        TokenType.Colon,
        "Missing colon following identifier in ObjectExpr"
      );
      const value = this.parse_expr();

      properties.push({ kind: "Property", value, key });
      if (this.at().type != TokenType.CloseBrace) {
        this.expect(
          TokenType.Comma,
          "Expected comma or closing bracket following property"
        );
      }
    }

    this.expect(TokenType.CloseBrace, "Object literal missing closing brace.");
    return { kind: "ObjectLiteral", properties } as ObjectLiteral;
  }

  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicitave_expr();

    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parse_multiplicitave_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  private parse_multiplicitave_expr(): Expr {
    let left = this.parse_call_member_expr();

    while (
      this.at().value == "/" ||
      this.at().value == "*" ||
      this.at().value == "%"
    ) {
      const operator = this.eat().value;
      const right = this.parse_call_member_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  private parse_call_member_expr(): Expr {
    const member = this.parse_member_expr();

    if (this.at().type == TokenType.OpenParen) {
      return this.parse_call_expr(member);
    }

    return member;
  }

  private parse_call_expr(caller: Expr): Expr {
    let call_expr: Expr = {
      kind: "CallExpr",
      caller,
      args: this.parse_args(),
    } as CallExpr;

    if (this.at().type == TokenType.OpenParen) {
      call_expr = this.parse_call_expr(call_expr);
    }

    return call_expr;
  }

  private parse_args(): Expr[] {
    this.expect(TokenType.OpenParen, "Expected open parenthesis");
    const args =
      this.at().type == TokenType.CloseParen ? [] : this.parse_arguments_list();

    this.expect(
      TokenType.CloseParen,
      "Missing closing parenthesis inside arguments list"
    );
    return args;
  }

  private parse_arguments_list(): Expr[] {
    const args = [this.parse_assignment_expr()];

    while (this.at().type == TokenType.Comma && this.eat()) {
      args.push(this.parse_assignment_expr());
    }

    return args;
  }

  private parse_member_expr(): Expr {
    let object = this.parse_primary_expr();

    while (
      this.at().type == TokenType.Dot ||
      this.at().type == TokenType.OpenBracket
    ) {
      const operator = this.eat();
      let property: Expr;
      let computed: boolean;

      if (operator.type == TokenType.Dot) {
        computed = false;
        property = this.parse_primary_expr();
        if (property.kind != "Identifier") {
          throw `Cannonot use dot operator without right hand side being a identifier`;
        }
      } else {
        computed = true;
        property = this.parse_expr();
        this.expect(
          TokenType.CloseBracket,
          "Missing closing bracket in computed value."
        );
      }

      object = {
        kind: "MemberExpr",
        object,
        property,
        computed,
      } as MemberExpr;
    }

    return object;
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

      case TokenType.OpenParen: {
        this.eat(); // Consome a abertura de parênteses
        const value = this.parse_expr();
        this.expect(
          TokenType.CloseParen,
          "Unexpected token found inside parenthesised expression. Expected closing parenthesis."
        ); // Fecha parênteses
        return value;
      }

      // Tokens não identificados
      default:
        console.error("Unexpected token found during parsing!", this.at());
        process.exit(1);
    }
  }
}
