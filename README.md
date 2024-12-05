**SPL** <sup>_Simple Programming Language_<sup>

# Getting started

### 1. Clone o projeto:

```bash
git clone https://github.com/caio-andres/simple-programming-language.git
```

### 2. Vá para o diretório da linguagem:

```bash
cd language
```

### 3. Instale as dependências:

```bash
npm i
```

### 4. Execute o projeto:

```bash
npm start
```

# Commands

| **SPL (Linguagem)**     | **Descrição**                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<program>`             | Representa um programa composto por uma ou mais declarações.                                                                                             |
| `<statement>`           | Uma instrução no programa, que pode ser uma atribuição, uma expressão seguida de ponto e vírgula, ou uma estrutura de controle (`if`, `while`, `print`). |
| `<assignment>`          | Declaração de atribuição que associa o valor de uma expressão a um identificador.                                                                        |
| `<if_statement>`        | Estrutura condicional que avalia uma condição e executa um bloco de instruções com suporte opcional ao bloco `else`.                                     |
| `<while_statement>`     | Estrutura de repetição que executa um bloco de instruções enquanto a condição especificada for verdadeira.                                               |
| `<print_statement>`     | Imprime o valor de uma expressão ou string no console.                                                                                                   |
| `<expression>`          | Representa uma operação matemática, podendo conter termos com operadores de soma ou subtração.                                                           |
| `<term>`                | Parte de uma expressão envolvendo multiplicação ou divisão de fatores.                                                                                   |
| `<factor>`              | Elemento base de uma expressão: número, nome, string ou outra expressão entre parênteses.                                                                |
| `<conditional>`         | Expressão booleana que avalia condições lógicas usando operadores `OR`.                                                                                  |
| `<bool_term>`           | Subexpressão booleana usando operador lógico `AND`.                                                                                                      |
| `<bool_factor>`         | Representa uma comparação entre duas expressões usando operadores relacionais.                                                                           |
| `<relational_operator>` | Operadores relacionais utilizados para comparar valores (`==`, `!=`, `<`, `<=`, `>`, `>=`).                                                              |
| `<number>`              | Literal numérico composto por dígitos de 0 a 9.                                                                                                          |
| `<name>`                | Identificador válido começando com uma letra ou sublinhado, seguido por letras, números ou sublinhados.                                                  |
| `<string>`              | Literal de string delimitada por aspas duplas.                                                                                                           |

# How it work?

### 1. **AST (Abstract Syntax Tree)**

- **Função**: Representa a estrutura do código-fonte de forma hierárquica.
- **Responsabilidade**: Organiza o código em uma árvore de nós que reflete a sintaxe do código. Cada nó representa uma parte do código (variáveis, expressões, etc.), facilitando a análise e execução posterior.

### 2. **Lexer**

- **Função**: Realiza o processo de **tokenização**.
- **Responsabilidade**: Converte o código-fonte em uma sequência de tokens, que são unidades básicas de significado (como palavras-chave, operadores, números). O Lexer facilita a análise, dividindo o código em partes compreensíveis.

### 3. **Parser**

- **Função**: Converte a sequência de tokens em uma **Árvore de Sintaxe Abstrata (AST)**.
- **Responsabilidade**: Recebe os tokens gerados pelo Lexer e constrói a AST, organizando-os conforme as regras de sintaxe da linguagem. O Parser valida o código e garante que ele tenha a estrutura correta.

### 4. **Expressions**

- **Função**: Representa todas as expressões possíveis no código.
- **Responsabilidade**: Define os tipos de expressões (como literais numéricos, chamadas de função, variáveis, etc.), que são usadas nas árvores de sintaxe para representar cálculos ou acessos a dados.

### 5. **Statements**

- **Função**: Define instruções que não geram um valor diretamente.
- **Responsabilidade**: Contém estruturas como declarações de variáveis e definições de funções. Elas alteram o estado do programa ou controlam o fluxo de execução, mas não retornam diretamente um valor.

### 6. **Environment**

- **Função**: Representa o contexto de execução do programa.
- **Responsabilidade**: Armazena as variáveis e funções definidas no programa. É responsável por gerenciar o escopo e fornecer valores de variáveis durante a execução do código.

### 7. **Interpreter**

- **Função**: Executa a AST no ambiente.
- **Responsabilidade**: Avalia as expressões e executa as instruções definidas na AST. Ele interpreta o código e realiza as operações necessárias, como cálculos, chamadas de funções e manipulação de variáveis.

### 8. **Values**

- **Função**: Representa os valores que podem ser manipulados no código.
- **Responsabilidade**: Define os tipos de dados que o programa pode manipular, como números, strings e objetos. São os resultados das expressões que o interpretador calcula e manipula ao executar o código.

# Technologies used

- `TypeScript` <sub>_Linguagem de Programação_</sub>

- `Node.js` <sub>_Ambiente de Execução_</sub>

# Project developers

| Name                           | RA        |
| ------------------------------ | --------- |
| Caio André Porto de Oliveira   | 822156202 |
| Carlos Armando Munhoz Vilela   | 822159355 |
| Felipe Mori Ferreira           | 822129885 |
| Giulio Enrico Miranda Maciotta | 822138213 |
| Gustavo Morais Cardoso         | 822154343 |
