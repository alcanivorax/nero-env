export type Severity = "error" | "warning";

export interface FormattedSection {
  title: string;
  items: string[];
  severity: "error" | "warning";
  source: ".env" | ".env.example";
}

export interface FormattedReport {
  sections: FormattedSection[];
  hasIssues: boolean;
}
