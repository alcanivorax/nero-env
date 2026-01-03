import { Command } from "commander";
import { resolve } from "node:path";

export interface CliOptions {
  projectPath: string;
}

export function parseOptions(): CliOptions {
  const program = new Command();

  program
    .name("nero-env")
    .description("Validate and compare .env files")
    .option("-p, --path <path>", "Path to the project directory", process.cwd())
    .parse(process.argv);

  const opts = program.opts<{ path: string }>();

  return {
    projectPath: resolve(opts.path),
  };
}
