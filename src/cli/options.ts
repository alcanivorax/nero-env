import { Command } from "commander";
import path from "node:path";

export interface CliOptions {
  path: string;
  strict: boolean;
  json: boolean;
}

export function parseOptions(): CliOptions {
  const program = new Command();

  program
    .name("nero-env")
    .description("Validate and compare .env files")
    .option("-p, --path <path>", "Path to the project directory", process.cwd())
    // .option("--strict", "Exit with non-zero code if issues are found", false)
    // .option("--json", "Output result as JSON", false)
    .parse(process.argv);

  const opts = program.opts<{
    path: string;
    strict: boolean;
    json: boolean;
  }>();

  return {
    path: path.resolve(opts.path),
    strict: Boolean(opts.strict),
    json: Boolean(opts.json),
  };
}
