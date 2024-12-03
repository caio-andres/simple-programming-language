import {
  MK_BOOL,
  MK_NATIVE_FN,
  MK_NULL,
  MK_NUMBER,
  RuntimeVal,
} from "./values.ts";

// Cria um ambiente global com valores e funções padrão
export function createGlobalEnv() {
  const env = new Environment();

  // Define valores globais padrão
  env.declareVar("true", MK_BOOL(true), true);
  env.declareVar("false", MK_BOOL(false), true);
  env.declareVar("null", MK_NULL(), true);

  // Define função nativa "print" para exibir argumentos no console
  env.declareVar(
    "print",
    // deno-lint-ignore no-unused-vars
    MK_NATIVE_FN((args, scope) => {
      console.log(...args);
      return MK_NULL();
    }),
    true
  );

  // Define função nativa "time" para retornar o timestamp atual
  function timeFunction(_args: RuntimeVal[], _env: Environment) {
    return MK_NUMBER(Date.now());
  }
  env.declareVar("time", MK_NATIVE_FN(timeFunction), true);

  return env;
}

// Implementação da classe Environment para gerenciar escopos e variáveis
export default class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeVal>;
  private constants: Set<string>;

  // Inicializa o ambiente, podendo herdar de um pai
  constructor(parentENV?: Environment) {
    this.parent = parentENV;
    this.variables = new Map();
    this.constants = new Set();
  }

  // Declara uma variável no ambiente atual
  public declareVar(
    varname: string,
    value: RuntimeVal,
    constant: boolean
  ): RuntimeVal {
    if (this.variables.has(varname)) {
      throw `Cannot declare variable ${varname}. As it already is defined.`;
    }

    this.variables.set(varname, value);
    if (constant) {
      this.constants.add(varname);
    }
    return value;
  }

  // Atribui valor a uma variável existente, respeitando constantes
  public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
    const env = this.resolve(varname);

    if (env.constants.has(varname)) {
      throw `Cannot reassign to variable ${varname} as it was declared constant.`;
    }

    env.variables.set(varname, value);
    return value;
  }

  // Recupera o valor de uma variável, resolvendo no escopo correto
  public lookupVar(varname: string): RuntimeVal {
    const env = this.resolve(varname);
    return env.variables.get(varname) as RuntimeVal;
  }

  // Resolve o ambiente onde a variável foi declarada
  public resolve(varname: string): Environment {
    if (this.variables.has(varname)) {
      return this;
    }

    if (!this.parent) {
      throw `Cannot resolve '${varname}' as it does not exist.`;
    }

    return this.parent.resolve(varname);
  }
}
