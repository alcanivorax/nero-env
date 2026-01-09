import { EnvMap, EnvIssues, EnvReport } from "./types.js";

export function compareEnv(exampleEnv: EnvMap, actualEnv: EnvMap): EnvReport {
  const expectedKeys = new Set(Object.keys(exampleEnv));
  const actualKeys = new Set(Object.keys(actualEnv));

  const issues: EnvIssues = {
    missing: [],
    unused: [],
    empty: [],
  };

  // Missing: expected but not provided
  for (const key of expectedKeys) {
    if (!actualKeys.has(key)) {
      issues.missing.push(key);
    }
  }

  // Unused: provided but not expected
  for (const key of actualKeys) {
    if (!expectedKeys.has(key)) {
      issues.unused.push(key);
    }
  }

  // Empty: provided but value is empty string
  for (const [key, value] of Object.entries(actualEnv)) {
    if (value === "") {
      issues.empty.push(key);
    }
  }

  const hasIssues =
    issues.missing.length > 0 ||
    issues.unused.length > 0 ||
    issues.empty.length > 0;

  return {
    issues,
    hasIssues,
  };
}
