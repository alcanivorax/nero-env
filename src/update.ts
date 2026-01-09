import updateNotifier from "update-notifier";
import { CLI_NAME, CLI_VERSION } from "./meta.js";

export function notifyUpdate(): void {
  updateNotifier({
    pkg: {
      name: CLI_NAME,
      version: CLI_VERSION,
    },
    updateCheckInterval: 1000 * 60 * 60 * 24,
  }).notify({ isGlobal: true });
}
