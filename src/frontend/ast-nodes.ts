interface ASTNode {
  id: number;
  type: string;
}

class ASTNodeCounter {
  private static currentId: number = 0;

  public static getNextId(): number {
    return ++this.currentId;
  }
}

class NumberNode implements ASTNode {
  id: number;
  constructor(public value: string) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Number";
}

class NameNode implements ASTNode {
  id: number;
  constructor(public value: string) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Name";
}

class AssignmentNode implements ASTNode {
  id: number;
  constructor(public name: NameNode, public value: ASTNode) {
    this.id = ASTNodeCounter.getNextId();
  }
  type = "Assignment";
}
