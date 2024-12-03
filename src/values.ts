import Environment from "./environment.ts";
import { Stmt } from "./ast-nodes.ts";

export type ValueType =
  | "null" // Representa valores nulos
  | "number" // Representa números
  | "boolean" // Representa valores booleanos
  | "object" // Representa objetos
  | "native-fn" // Representa funções nativas (implementadas em JavaScript)
  | "function"; // Representa funções definidas na linguagem

// Interface base para valores em tempo de execução
export interface RuntimeVal {
  type: ValueType;
}

/**
 * Representa um valor nulo em tempo de execução
 */
export interface NullVal extends RuntimeVal {
  type: "null"; // O tipo é "null"
  value: null; // O valor é literalmente nulo
}

// Função para criar um valor nulo
export function MK_NULL() {
  return { type: "null", value: null } as NullVal;
}

// Interface para valores booleanos em tempo de execução
export interface BooleanVal extends RuntimeVal {
  type: "boolean";
  value: boolean;
}

// Função para criar um valor booleano
export function MK_BOOL(b = true) {
  return { type: "boolean", value: b } as BooleanVal;
}

/**
 * Representa um valor numérico em tempo de execução, que acessa diretamente números JavaScript
 */
export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

// Função para criar um valor numérico
export function MK_NUMBER(n = 0) {
  return { type: "number", value: n } as NumberVal;
}

/**
 * Representa um objeto em tempo de execução
 */
export interface ObjectVal extends RuntimeVal {
  type: "object";
  properties: Map<string, RuntimeVal>; // Mapa de propriedades (chave/valor)
}

// Define o tipo de uma função nativa, que recebe argumentos e um ambiente
export type FunctionCall = (args: RuntimeVal[], env: Environment) => RuntimeVal;

// Interface para valores de funções nativas
export interface NativeFnValue extends RuntimeVal {
  type: "native-fn";
  call: FunctionCall;
}

// Função para criar uma função nativa
export function MK_NATIVE_FN(call: FunctionCall) {
  return { type: "native-fn", call } as NativeFnValue;
}

// Interface para valores de funções definidas na linguagem
export interface FunctionValue extends RuntimeVal {
  type: "function";
  name: string;
  parameters: string[];
  declarationEnv: Environment; // Ambiente em que foi declarada
  body: Stmt[]; // Corpo da função (lista de statements)
}
