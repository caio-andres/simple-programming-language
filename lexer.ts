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

// Mapeando com tabela de palavras-chave (keywords), especificando o tipo das chaves <string> e dos valores <TokenType>
const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  number: TokenType.Number,
  identifier: TokenType.Identifier,
};

// Interface que representa um token
export interface Token {
  value: string; // Texto literal do token
  type: TokenType; // Tipo do token
}

// Função auxiliar para criar um token a partir de um valor e tipo
function token(value = "", type: TokenType): Token {
  return { value, type };
}

// Vericar se há uma letra do alfabeto (A-Z)(a-z)
function isAlpha(src: string) {
  return src.toUpperCase() != src.toLowerCase();
  // Se os dois forem iguais, o caractere é não alfabético (número, símbolo, espaço e etc)
  // Letras do alfabeto têm formas maiúsculas e minúsculas diferentes, então o resultado de toUpperCase() e toLowerCase() será diferente.
  // Outros caracteres (como números) não possuem distinções maiúsculas/minúsculas, então o resultado será o mesmo.
}

// Verificar se há um espaço em branco no retorno
function isSkippable(str: string) {
  return str == " " || str == "\n" || str == "\t";
}

// Verificar se o primeiro caractere é um dígito entre 0 e 9
function isInt(str: string) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)]; // O código ASCII de 0 é 48, de 9 é 57
  return c >= bounds[0] && c <= bounds[1]; // True ou falso, dependendo do valor de C
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
    } else if (
      src[0] == "+" ||
      src[0] == "-" ||
      src[0] == "*" ||
      src[0] == "/"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else {
      // Lidar com tokens de vários caracteres

      // Construir um token de número
      if (isInt(src[0])) {
        let num = "";
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }
        tokens.push(token(num, TokenType.Number));
      } else if (isAlpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift();
        }

        // Check para keywords reservadas
        const reserved = KEYWORDS[ident];
        if (reserved == undefined) {
          tokens.push(token(ident, TokenType.Identifier));
        } else {
          tokens.push(token(ident, reserved));
        }
      } else if (isSkippable(src[0])) {
        src.shift(); // Skipa o caractere atual
      } else {
        console.log("Caractere irreconhecível encontrado no src: ", src[0]);
        Deno.exit(1);
      }
    }
  }
  return tokens; // Retorna o array de tokens identificados no código
}

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)) {
  console.log(token);
}
