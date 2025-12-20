import path from "node:path";

import { parseOptions } from "./options";

import { readEnvFile } from "../core/readEnv";
import { compareEnv } from "../core/compareEnv";
import { validateEnv } from "../core/validateEnv";

import { formatEnvReport } from "../output/formatter";
import { printReport } from "../output/printer";

export function run(): void {
  const options = parseOptions();

  const targetPath = options.path;

  const envFilePath = path.join(targetPath, ".env");
  const exampleFilePath = path.join(targetPath, ".env.example");

  const actualEnv = readEnvFile(envFilePath);
  const exampleEnv = readEnvFile(exampleFilePath);

  const report = compareEnv(exampleEnv, actualEnv);

  // extra validation layer
  const emptyKeys = validateEnv(actualEnv);
  if (emptyKeys.length > 0) {
    report.issues.empty = emptyKeys;
    report.hasIssues = true;
  }

  const formattedReport = formatEnvReport(report);

  printReport(formattedReport);

  // exit code handling
  if (options.strict && formattedReport.hasIssues) {
    process.exit(1);
  }
}
