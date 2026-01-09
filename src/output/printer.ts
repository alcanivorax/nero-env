import chalk from "chalk";
import { FormattedReport, FormattedSection } from "./types.js";

const icons = {
  error: chalk.red("❌"),
  warning: chalk.yellow("⚠️"),
  success: chalk.green("✅"),
};

export function printReport(report: FormattedReport): void {
  // Title
  console.log(chalk.bold("Nero Env Check"));
  console.log(chalk.dim("─────────────\n"));

  // Success case
  if (!report.hasIssues || report.sections.length === 0) {
    console.log(
      `${icons.success} ${chalk.green("No environment issues found")}`
    );
    printSummary(0, 0);
    return;
  }

  let errorCount = 0;
  let warningCount = 0;

  // Issue sections
  for (const section of report.sections) {
    printSection(section);
    console.log(); // spacing

    if (section.severity === "error") {
      errorCount += section.items.length;
    } else if (section.severity === "warning") {
      warningCount += section.items.length;
    }
  }

  printSummary(errorCount, warningCount);
}

function printSection(section: FormattedSection): void {
  const icon = icons[section.severity];

  if (section.source === ".env") {
    console.log(
      `${icon}  ${chalk.bold(section.title)} ${chalk.dim(
        `(${section.source})`
      )}`
    );
  } else {
    console.log(
      `${icon}  ${chalk.bold(section.title)} ${chalk.dim(
        `(not declared in ${section.source})`
      )}`
    );
  }

  for (const item of section.items) {
    console.log(`  ${chalk.dim("•")} ${chalk.cyan(item)}`);
  }
}

function printSummary(errors: number, warnings: number): void {
  console.log(chalk.dim("─────────────"));

  if (errors === 0 && warnings === 0) {
    console.log(chalk.dim("Summary: ") + chalk.green("No issues found"));
    return;
  }

  const parts: string[] = [];

  if (errors > 0) {
    parts.push(chalk.red(`${errors} error${errors > 1 ? "s" : ""}`));
  }

  if (warnings > 0) {
    parts.push(chalk.yellow(`${warnings} warning${warnings > 1 ? "s" : ""}`));
  }

  console.log(chalk.dim("Summary: ") + parts.join(chalk.dim(", ")));
}
