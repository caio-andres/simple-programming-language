export interface ASTNode {
  id: number;
  type: string;
}

export class ASTNodeCounter {
  private static currentId: number = 0;

  public static getNextId(): number {
    return ++this.currentId;
  }

  public static resetId(): void {
    this.currentId = 0;
  }
}

export class NumberNode implements ASTNode {
  id: number;
  constructor(public value: string) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Number";
}

export class NameNode implements ASTNode {
  id: number;
  constructor(public value: string) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Name";
}

export class AssignmentNode implements ASTNode {
  id: number;
  constructor(public name: NameNode, public value: ASTNode) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Assignment";
}

export class BinaryOpNode implements ASTNode {
  id: number;
  constructor(
    public left: ASTNode,
    public operator: string,
    public right: ASTNode
  ) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "BinaryOp";
}

export class ConditionalNode implements ASTNode {
  id: number;
  constructor(
    public left: ASTNode,
    public operator: string,
    public right: ASTNode
  ) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Conditional";
}

export class IfNode implements ASTNode {
  id: number;
  constructor(
    public condition: ASTNode,
    public thenBranch: ASTNode,
    public elseBranch: ASTNode | null = null
  ) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "If";
}
