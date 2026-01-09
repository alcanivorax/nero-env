type Severity = "error" | "warning";

interface FormattedSection {
  title: string;
  items: string[];
  severity: "error" | "warning";
  source: ".env" | ".env.example";
}

interface FormattedReport {
  sections: FormattedSection[];
  hasIssues: boolean;
}

export type { Severity, FormattedReport, FormattedSection };
