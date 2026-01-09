type EnvMap = Record<string, string | undefined>;

type EnvIssueType = "missing" | "unused" | "empty";

interface EnvIssue {
  type: EnvIssueType;
  key: string;
}

interface EnvIssues {
  missing: string[];
  unused: string[];
  empty: string[];
}

interface EnvReport {
  issues: EnvIssues;
  hasIssues: boolean;
}

export type { EnvMap, EnvIssue, EnvIssues, EnvReport, EnvIssueType };
