import { Command } from "commander";
import { resolve } from "node:path";
import { CLI_NAME, CLI_VERSION } from "../meta.js";

export interface CliOptions {
  projectPath: string;
}

export function parseOptions(): CliOptions {
  const program = new Command();

  program
    .name(CLI_NAME)
    .description("Validate and compare .env files")
    .version(CLI_VERSION, "-v, --version", "output the version number")
    .option(
      "-p, --path <path>",
      "Path to the project directory (defaults to current working directory)",
      process.cwd()
    )
    .helpOption("-h, --help", "display help for command")
    .parse(process.argv);

  const opts = program.opts<{ path: string }>();

  return {
    projectPath: resolve(opts.path),
  };
}
