import chalk from "chalk";
import { FormattedReport, FormattedSection } from "./types.js";
import { theme } from "./theme.js";

const icons = {
  error: theme.severity.high("❌"),
  warning: theme.severity.medium("⚠️"),
  success: theme.severity.low("✅"),
};

export function printReport(report: FormattedReport): void {
  // Title
  console.log(theme.header("Nero Env Check"));
  console.log(theme.muted("─────────────\n"));

  // Success case
  if (!report.hasIssues || report.sections.length === 0) {
    console.log(
      `${icons.success} ${theme.muted("No environment issues found")}`
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
      `${icon}  ${theme.title(section.title)} ${theme.muted(
        `(${section.source})`
      )}`
    );
  } else {
    console.log(
      `${icon}  ${theme.title(section.title)} ${theme.muted(
        `(not declared in ${section.source})`
      )}`
    );
  }

  for (const item of section.items) {
    console.log(`  ${theme.bullet} ${theme.muted(item)}`);
  }
}

function printSummary(errors: number, warnings: number): void {
  console.log(theme.muted("─────────────"));

  if (errors === 0 && warnings === 0) {
    console.log(theme.title("Summary: ") + theme.muted("No issues found"));
    return;
  }

  const parts: string[] = [];

  if (errors > 0) {
    parts.push(theme.severity.high(`${errors} error${errors > 1 ? "s" : ""}`));
  }

  if (warnings > 0) {
    parts.push(
      theme.severity.medium(`${warnings} warning${warnings > 1 ? "s" : ""}`)
    );
  }

  console.log(theme.title("Summary: ") + parts.join(theme.muted(", ")));
}
