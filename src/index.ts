#!/usr/bin/env node

import { run } from "./cli/command";

try {
  run();
} catch (err) {
  console.error("Unexpected error:", err);
  process.exit(1);
}
