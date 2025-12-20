import { EnvReport } from "../core/types";
import { FormattedReport, FormattedSection } from "./types";

export function formatEnvReport(report: EnvReport): FormattedReport {
  const sections: FormattedSection[] = [];

  const { missing, unused, empty } = report.issues;

  if (missing.length > 0) {
    sections.push({
      title: "Missing variables",
      items: missing,
      severity: "error",
      source: ".env",
    });
  }

  if (unused.length > 0) {
    sections.push({
      title: "Unused variables",
      items: unused,
      severity: "warning",
      source: ".env.example",
    });
  }

  if (empty.length > 0) {
    sections.push({
      title: "Empty variables",
      items: empty,
      severity: "warning",
      source: ".env",
    });
  }

  return {
    sections,
    hasIssues: report.hasIssues,
  };
}
