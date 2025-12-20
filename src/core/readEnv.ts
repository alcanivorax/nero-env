import fs from "node:fs";
import { EnvMap } from "./types";

export function readEnvFile(filePath: string): EnvMap {
  const envVariables: EnvMap = {};

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    if (!fileContent) {
      return envVariables;
    }

    const lines = fileContent.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const rawLine = lines[lineIndex].trim();

      // Skip empty lines and comments
      if (!rawLine || rawLine.startsWith("#")) {
        continue;
      }

      const equalsIndex = rawLine.indexOf("=");

      // Skip malformed lines (no '=')
      if (equalsIndex === -1) {
        continue;
      }

      const key = rawLine.slice(0, equalsIndex).trim();
      const value = rawLine.slice(equalsIndex + 1).trim();

      envVariables[key] = value;
    }
  } catch {
    return envVariables;
  }

  return envVariables;
}
