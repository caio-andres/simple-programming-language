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

### 5. Abra um segundo terminal (sem fechar o primeiro) e vá para o diretório da interface:

```bash
cd interface
```

### 6. Instale as dependências:

```bash
# É necessário utilizar este comando para que não ocorra conflito de dependências
npm i react-json-view --legacy-peer-deps
```

### 7. Execute o projeto:

```bash
npm run dev
```

### 8. Abra o browser pelo terminal:

```bash
# Pressione estas teclas:
O + enter
```

Enjoy!

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

# Technologies used

- `TypeScript` <sub>_Linguagem de Programação_</sub>

- `Node.js` <sub>_Ambiente de Execução_</sub>

- `Express` <sub>_Framework Back-end_</sub>

- `React` <sub>_Framework Front-end_</sub>

# Project developers

| Name                           | RA        |
| ------------------------------ | --------- |
| Caio André Porto de Oliveira   | 822156202 |
| Carlos Armando Munhoz Vilela   | 822159355 |
| Felipe Mori Ferreira           | 822129885 |
| Giulio Enrico Miranda Maciotta | 822138213 |
| Gustavo Morais Cardoso         | 822154343 |
