import Parser from "./parser.ts";
import { createGlobalEnv } from "./environment.ts";
import { evaluate } from "./interpreter.ts";
import fs from "node:fs";

run("./src/test/test.txt");

async function run(filename: string) {
  const parser = new Parser();
  const env = createGlobalEnv();

  const input = await fs.readFileSync(filename, "utf-8");

  const program = parser.produceAST(input);

  const result = evaluate(program, env);
  console.log(result);
}
