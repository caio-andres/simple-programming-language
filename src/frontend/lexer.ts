export enum TokenType {
  // Palavras-chave
  Let,
  Const,
  Fn, // Função

  // Tipos Literais
  Number, // Número
  Identifier, // Identificador

  // Agrupamento * Operadores
  BinaryOperator, // "+", "-", "*", "/"
  Equals, // =
  Comma, // ,
  Dot, // .
  Colon, // :
  Semicolon, // ;
  OpenParen, // (
  CloseParen, // )
  OpenBrace, // {
  CloseBrace, // }
  OpenBracket, // [
  CloseBracket, // ]
  EOF, // End of file (Fim do arquivo)
}

/**
 * Constante para mapear palavras-chave e identificadores conhecidos + símbolos.
 */
const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  const: TokenType.Const,
  fn: TokenType.Fn,
};

// Representa um único token gerado a partir do código fonte.
export interface Token {
  value: string; // contém o valor bruto como visto no código fonte.
  type: TokenType; // estrutura tagueada.
}

// Retorna um token de um dado tipo e valor
function token(value = "", type: TokenType): Token {
  return { value, type };
}

/**
 * Retorna se o caractere passado é alfabético -> [a-zA-Z]
 */
function isalpha(src: string) {
  return src.toUpperCase() != src.toLowerCase();
}

/**
 * Retorna true se o caractere é um espaço em branco -> [\s, \t, \n]
 */
function isskippable(str: string) {
  return str == " " || str == "\n" || str == "\t" || str == "\r";
}

/**
 Retorna se o caractere é um número inteiro válido -> [0-9]
 */

function isint(str: string) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}

/**
 * Dado uma string representando o código fonte: Produz tokens e lida
 * com possíveis caracteres não identificados.
 *
 * - Retorna um array de tokens.
 * - Não modifica a string de entrada.
 */
export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split("");

  // Produz tokens até que o EOF seja alcançado.
  while (src.length > 0) {
    // COMEÇA A ANALISAR TOKENS DE UM ÚNICO CARACTERE
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (src[0] == "{") {
      tokens.push(token(src.shift(), TokenType.OpenBrace));
    } else if (src[0] == "}") {
      tokens.push(token(src.shift(), TokenType.CloseBrace));
    } else if (src[0] == "[") {
      tokens.push(token(src.shift(), TokenType.OpenBracket));
    } else if (src[0] == "]") {
      tokens.push(token(src.shift(), TokenType.CloseBracket));
    } // LIDA COM OPERADORES BINÁRIOS
    else if (
      src[0] == "+" ||
      src[0] == "-" ||
      src[0] == "*" ||
      src[0] == "/" ||
      src[0] == "%"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } // Lida com tokens condicionais e de atribuição
    else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else if (src[0] == ";") {
      tokens.push(token(src.shift(), TokenType.Semicolon));
    } else if (src[0] == ":") {
      tokens.push(token(src.shift(), TokenType.Colon));
    } else if (src[0] == ",") {
      tokens.push(token(src.shift(), TokenType.Comma));
    } else if (src[0] == ".") {
      tokens.push(token(src.shift(), TokenType.Dot));
    } // LIDA COM PALAVRAS-CHAVE, TOKENS E IDENTIFICADORES MULTICARACTERE...
    else {
      // Lida com literais numéricos -> Inteiros
      if (isint(src[0])) {
        let num = "";
        while (src.length > 0 && isint(src[0])) {
          num += src.shift();
        }

        // Adiciona um novo token numérico.
        tokens.push(token(num, TokenType.Number));
      } // Lida com identificadores e tokens de palavras-chave.
      else if (isalpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isalpha(src[0])) {
          ident += src.shift();
        }

        // VERIFICA PALAVRAS-CHAVE RESERVADAS
        const reserved = KEYWORDS[ident];
        // Se o valor não for undefined, o identificador é uma
        // palavra-chave reconhecida
        if (typeof reserved == "number") {
          tokens.push(token(ident, reserved));
        } else {
          // Nome não reconhecido deve ser um símbolo definido pelo usuário.
          tokens.push(token(ident, TokenType.Identifier));
        }
      } else if (isskippable(src[0])) {
        // Ignora caracteres desnecessários.
        src.shift();
      } // Lida com caracteres não reconhecidos.
      // TODO: Implementar melhores erros e recuperação de erros.
      else {
        console.error(
          "Caractere não reconhecido encontrado no código fonte: ",
          src[0].charCodeAt(0),
          src[0]
        );
        process.exit(1);
      }
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}
