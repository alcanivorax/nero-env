import { EnvMap } from "./types.js";

export function validateEnv(actualEnv: EnvMap): string[] {
  const emptyKeys: string[] = [];

  for (const [key, value] of Object.entries(actualEnv)) {
    if (value === "") {
      emptyKeys.push(key);
    }
  }

  return emptyKeys;
}
