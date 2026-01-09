#!/usr/bin/env node

import { run } from "./cli/command.js";
import { notifyUpdate } from "./update.js";

try {
  notifyUpdate();
  run();
} catch (err) {
  console.error("Unexpected error:", err);
  process.exit(1);
}
