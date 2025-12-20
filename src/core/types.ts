export type EnvMap = Record<string, string | undefined>;

export type EnvIssueType = "missing" | "unused" | "empty";

export interface EnvIssue {
  type: EnvIssueType;
  key: string;
}

export interface EnvIssues {
  missing: string[];
  unused: string[];
  empty: string[];
}

export interface EnvReport {
  issues: EnvIssues;
  hasIssues: boolean;
}
