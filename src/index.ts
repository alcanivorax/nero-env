#!/usr/bin/env node

import { run } from "./cli/command.js";

import { checkForCliUpdate } from "cli-update-check";
import { CLI_NAME, CLI_VERSION } from "./meta.js";
import { theme } from "./output/theme.js";

try {
  run();
  setTimeout(async () => {
    const msg = await checkForCliUpdate({
      name: CLI_NAME,
      version: CLI_VERSION,
    });

    if (msg) {
      console.log(
        "\n" +
          theme.muted("─────────────") +
          "\n" +
          theme.muted("Update available") +
          "\n" +
          theme.muted(msg.replace("Update available:", "").trim()) +
          "\n" +
          theme.muted("─────────────")
      );
    }
  }, 0);
} catch (err) {
  console.error("Unexpected error:", err);
  // console.log("Run: nero-env --help for usage");
  process.exit(1);
}
