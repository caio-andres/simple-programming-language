import Parser from "./frontend/parser.ts";
import { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
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
