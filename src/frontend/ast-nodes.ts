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
