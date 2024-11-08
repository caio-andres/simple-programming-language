// Enum que define os tipos de token possíveis
export enum TokenType {
  Number, // Números em geral
  Identifier, // Nome de variáveis
  Equals, // "="
  OpenParen, // "("
  CloseParen, // ")"
  BinaryOperator, // "+", "-", "*", "/"
  Let, // Declarar variáveis
}

// Interface que representa um token
export interface Token {
  value: string; // Texto literal do token
  type: TokenType; // Tipo do token
}

// Função auxiliar para criar um token a partir de um valor e tipo
function token(value: string, type: TokenType): Token {
  return { value, type };
}

// Função que converte o código em uma lista de tokens
export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>(); // Array que armazena os tokens identificados
  const src = sourceCode.split(""); // Separa cada caractere do código para análise

  // Construir cada token até o final do arquivo
  while (src.length > 0) {
    // Se o próximo caractere for "(", cria um token OpenParen e o adiciona ao array de tokens
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (src[0] == "+" || src[0] == "-") {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } else if (
      src[0] == "+" ||
      src[0] == "-" ||
      src[0] == "*" ||
      src[0] == "/"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    }
  }
  return tokens; // Retorna o array de tokens identificados no código
}
