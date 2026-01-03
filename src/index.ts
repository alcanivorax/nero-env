#!/usr/bin/env node

import { run } from "./cli/command";
import { notifyUpdate } from "./update";

try {
  notifyUpdate(); // non-blocking, safe, cached
  run();
} catch (err) {
  console.error("Unexpected error:", err);
  process.exit(1);
}
