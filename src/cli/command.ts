import { join } from "node:path";

import { parseOptions } from "./options.js";

import { readEnvFile } from "../core/readEnv.js";
import { compareEnv } from "../core/compareEnv.js";
import { validateEnv } from "../core/validateEnv.js";

import { formatEnvReport } from "../output/formatter.js";
import { printReport } from "../output/printer.js";

export function run(): void {
  const options = parseOptions();
  const targetPath = options.projectPath;

  const envFilePath = join(targetPath, ".env");
  const exampleFilePath = join(targetPath, ".env.example");

  const actualEnv = readEnvFile(envFilePath);
  const exampleEnv = readEnvFile(exampleFilePath);

  const report = compareEnv(exampleEnv, actualEnv);

  // Extra validation layer
  const emptyKeys = validateEnv(actualEnv);
  if (emptyKeys.length > 0) {
    report.issues.empty = emptyKeys;
    report.hasIssues = true;
  }

  const formattedReport = formatEnvReport(report);
  printReport(formattedReport);

  if (formattedReport.hasIssues) {
    process.exit(1);
  }
}
