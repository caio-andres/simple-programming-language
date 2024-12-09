// parser.ts
import { Token, TokenType, Lexer } from "./lexer";
import {
  BinaryOpNode,
  NumberNode,
  NameNode,
  AssignmentNode,
  ASTNode,
  IfNode,
  ConditionalNode,
  WhileNode,
} from "./ast-nodes";

export class Parser {
  private currentToken!: Token;

  constructor(private readonly lexer: Lexer) {
    this.currentToken = this.lexer.getNextToken();
  }

  private eat(tokenType: TokenType): void {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new Error(
        `Unexpected token: ${this.currentToken.type}, expected: ${tokenType}`
      );
    }
  }

  // parte nova
  private conditional(): ASTNode {
    const left = this.expr();
    if (this.currentToken.type === TokenType.EqualsEquals) {
      this.eat(TokenType.EqualsEquals);
      const right = this.expr();
      return new ConditionalNode(left, "==", right);
    } else if (this.currentToken.type === TokenType.Different) {
      this.eat(TokenType.Different);
      const right = this.expr();
      return new ConditionalNode(left, "!=", right);
    } else if (this.currentToken.type === TokenType.GreaterThan) {
      this.eat(TokenType.GreaterThan);
      const right = this.expr();
      return new ConditionalNode(left, ">", right);
    } else if (this.currentToken.type === TokenType.GreaterThanOrEqual) {
      this.eat(TokenType.GreaterThanOrEqual);
      const right = this.expr();
      return new ConditionalNode(left, ">=", right);
    } else if (this.currentToken.type === TokenType.SmallerThan) {
      this.eat(TokenType.SmallerThan);
      const right = this.expr();
      return new ConditionalNode(left, "<", right);
    } else if (this.currentToken.type === TokenType.SmallerThanOrEqual) {
      this.eat(TokenType.SmallerThanOrEqual);
      const right = this.expr();
      return new ConditionalNode(left, "<=", right);
    }
    return left;
  }

  private ifStatement(): ASTNode {
    this.eat(TokenType.If);
    const condition = this.conditional(); // Parse da condição
    this.eat(TokenType.Then);
    const thenBranch = this.statement(); // Parse do bloco `then`

    let elseBranch: ASTNode | null = null;
    if (this.currentToken.type === TokenType.Else) {
      this.eat(TokenType.Else);
      elseBranch = this.statement(); // Parse do bloco `else`
    }

    // Consumir o `;` opcional após o bloco `if` ou `else`
    if (this.currentToken.type === TokenType.Semicolon) {
      this.eat(TokenType.Semicolon);
    }

    return new IfNode(condition, thenBranch, elseBranch);
  }

  private whileStatement(): ASTNode {
    this.eat(TokenType.While);
    const condition = this.conditional(); // Parse da condição
    this.eat(TokenType.Do);
    const doBranch = this.statement(); // Parse do bloco 'do'

    if (this.currentToken.type === TokenType.Semicolon) {
      this.eat(TokenType.Semicolon);
    }

    return new WhileNode(condition, doBranch);
  }

  // fim da parte nova

  private factor(): ASTNode {
    const token = this.currentToken;
    if (token.type === TokenType.Number) {
      this.eat(TokenType.Number);
      return new NumberNode(token.value);
    } else if (token.type === TokenType.Name) {
      this.eat(TokenType.Name);
      return new NameNode(token.value);
    } else if (token.type === TokenType.LeftParen) {
      this.eat(TokenType.LeftParen);
      const node = this.expr();
      this.eat(TokenType.RightParen);
      return node;
    }
    throw new Error(`Fator inválido: ${token.value}`);
  }

  private term(): ASTNode {
    let node = this.factor();
    while (
      this.currentToken.type === TokenType.Multiply ||
      this.currentToken.type === TokenType.Divide
    ) {
      const token = this.currentToken;
      this.eat(token.type);
      node = new BinaryOpNode(node, token.value, this.factor());
    }
    return node;
  }

  private expr(): ASTNode {
    let node = this.term();
    while (
      this.currentToken.type === TokenType.Plus ||
      this.currentToken.type === TokenType.Minus
    ) {
      const token = this.currentToken;
      this.eat(token.type);
      node = new BinaryOpNode(node, token.value, this.term());
    }
    return node;
  }

  private assignment(): ASTNode {
    const variableToken = this.currentToken;
    this.eat(TokenType.Name);
    this.eat(TokenType.Equals);
    const exprNode = this.expr();
    this.eat(TokenType.Semicolon);
    return new AssignmentNode(new NameNode(variableToken.value), exprNode);
  }

  public statement(): ASTNode {
    if (this.currentToken.type === TokenType.If) {
      return this.ifStatement();
    } else if (this.currentToken.type === TokenType.While) {
      return this.whileStatement();
    } else if (this.currentToken.type === TokenType.Name) {
      const nextToken = this.lexer.lookAhead();
      if (nextToken.type === TokenType.Equals) {
        return this.assignment();
      }
    }
    return this.expr();
  }

  public parse(): ASTNode {
    return this.statement();
  }
}
