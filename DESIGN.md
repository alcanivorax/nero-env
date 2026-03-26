# DESIGN.md

## 1. Overview
`nero-env` is a Node.js TypeScript CLI that validates `.env` against `.env.example` to detect:
- Missing variables (expected but absent)
- Unused variables (present but not declared)
- Empty variables (declared with empty value)

Core design approach:
- Small, layered pipeline: **CLI parse -> file read -> compare/validate -> format -> print**
- Synchronous local file reads for deterministic CLI behavior
- Separate domain logic (`src/core`) from presentation (`src/output`)

## 2. Architecture

### High-Level Structure
- `src/index.ts`: CLI process entrypoint and update-check trigger.
- `src/cli/*`: argument parsing and command orchestration.
- `src/core/*`: env parsing, comparison, validation, shared domain types.
- `src/output/*`: report shaping, theming, and terminal rendering.
- `src/meta.ts`: package metadata bridge for CLI name/version.

### Data Flow
1. Parse CLI args into `CliOptions`.
2. Resolve project path and build `.env` + `.env.example` file paths.
3. Read both env files into `EnvMap`.
4. Compare expected vs actual keys (`compareEnv`) and detect empty values.
5. Re-validate empties (`validateEnv`) and merge into report.
6. Convert domain report to presentation report (`formatEnvReport`).
7. Print colored terminal report (`printReport`).
8. Fire asynchronous update check (`cli-update-check`).

### Entry Points
- Runtime: `src/index.ts` (`#!/usr/bin/env node`, package `bin` -> `dist/index.js`)
- Developer run: `pnpm dev` -> `tsx src/index.ts`

## 3. Files

| File | Purpose | Responsibilities | Dependencies | Used By |
|---|---|---|---|---|
| `.gitignore` | Repo hygiene | Ignore logs, build, env, IDE artifacts | N/A | Git tooling |
| `README.md` | User documentation | Install, usage, checks explained | N/A | npm/GitHub users |
| `CONTRIBUTING.md` | Contributor workflow | Setup, build, link/unlink instructions | N/A | Contributors |
| `LICENSE` | Legal terms | MIT license terms | N/A | Distribution/legal |
| `package.json` | Package manifest | Scripts, deps, bin mapping, metadata | npm/pnpm ecosystem | Build/runtime tooling |
| `tsconfig.json` | TS compiler config | Target/module settings, strict mode, outDir/rootDir | TypeScript | `tsc` |
| `assets/nero-env-preview.png` | Visual preview asset | README illustration | N/A | README |
| `src/meta.ts` | Runtime metadata adapter | Loads package name/version from JSON | `../package.json` | `src/index.ts`, `src/cli/options.ts` |
| `src/index.ts` | Process entrypoint | Runs command, triggers async update check, top-level error exit | `run`, `checkForCliUpdate`, `theme`, meta constants | Node runtime/bin |
| `src/cli/options.ts` | CLI arg parser | Defines flags/help/version and resolves project path | `commander`, `node:path`, meta constants | `src/cli/command.ts` |
| `src/cli/command.ts` | Main orchestration | End-to-end validation pipeline and printing | core + output modules, `node:path` | `src/index.ts` |
| `src/core/types.ts` | Domain typing | Env map, issue/report type contracts | TypeScript type system | core/output modules |
| `src/core/readEnv.ts` | `.env` parser | Reads file, ignores comments/blank/malformed lines, returns key/value map | `node:fs`, `EnvMap` | `src/cli/command.ts` |
| `src/core/compareEnv.ts` | Primary comparator | Computes missing/unused/empty and overall issue flag | `EnvMap`, `EnvIssues`, `EnvReport` | `src/cli/command.ts` |
| `src/core/validateEnv.ts` | Empty-value validator | Recomputes empty keys from actual env map | `EnvMap` | `src/cli/command.ts` |
| `src/output/types.ts` | Presentation typing | Formatted section/report contracts | TypeScript type system | formatter/printer |
| `src/output/formatter.ts` | Domain->presentation mapper | Builds titled/severity-tagged report sections | `EnvReport`, formatted types | `src/cli/command.ts` |
| `src/output/theme.ts` | Color/theme tokens | Centralized chalk-based style functions/tokens | `chalk` | `src/index.ts`, `src/output/printer.ts` |
| `src/output/printer.ts` | Terminal renderer | Prints title, sections, bullets, summary counts | `chalk`, formatted types, theme | `src/cli/command.ts` |

## 4. Functions / Classes
No classes exist; design is functional.

| Function / Type | Purpose | Inputs -> Outputs | Side Effects | Called By |
|---|---|---|---|---|
| `run` | Orchestrate CLI workflow | `() -> void` | Reads files, writes console output | `src/index.ts` |
| `parseOptions` | Parse command options | `() -> CliOptions` | Parses `process.argv` | `run` |
| `readEnvFile` | Parse env file to map | `(filePath: string) -> EnvMap` | Synchronous file read | `run` |
| `compareEnv` | Diff expected vs actual | `(exampleEnv, actualEnv) -> EnvReport` | None | `run` |
| `validateEnv` | Find empty values | `(actualEnv) -> string[]` | None | `run` |
| `formatEnvReport` | Build render-ready sections | `(report: EnvReport) -> FormattedReport` | None | `run` |
| `printReport` | Print whole report | `(report: FormattedReport) -> void` | Console output | `run` |
| `printSection` (internal) | Print one issue section | `(section) -> void` | Console output | `printReport` |
| `printSummary` (internal) | Print totals | `(errors, warnings) -> void` | Console output | `printReport` |
| `theme.*` tokens/functions | Styling palette | Varies (string/number -> styled string) | None | printer/index |
| `CLI_NAME`, `CLI_VERSION` | Expose package metadata | constants | JSON import read | options/index |
| `EnvMap`, `EnvIssueType`, `EnvIssue`, `EnvIssues`, `EnvReport` | Core domain contracts | Type-only | None | core/output |
| `Severity`, `FormattedSection`, `FormattedReport` | Output contracts | Type-only | None | formatter/printer |

## 5. Execution Flow (Runtime)
1. Node starts `src/index.ts` (compiled to `dist/index.js`).
2. `run()` executes synchronously.
3. `parseOptions()` resolves `--path` (default CWD).
4. `run()` constructs `.env` and `.env.example` absolute paths.
5. `readEnvFile()` parses both files into key/value maps; missing/unreadable files return `{}`.
6. `compareEnv()` computes missing/unused/empty issues.
7. `validateEnv()` recomputes empty keys and overwrites `report.issues.empty` when non-empty.
8. `formatEnvReport()` converts issues to titled sections with severity/source metadata.
9. `printReport()` renders report and summary.
10. `index.ts` schedules async update check (`setTimeout(..., 0)`), prints update notice if available.

## 6. Dependencies
- `commander`: CLI command/option parsing and help/version UX.
- `chalk`: colored terminal output and theme styling.
- `cli-update-check`: non-blocking npm version update notification.
- `typescript`, `tsx`, `ts-node`, `@types/node` (dev): compile and local TypeScript execution.
- Node built-ins:
  - `node:fs` for file reads
  - `node:path` for path resolution/join

## 7. Improvements
- Remove duplicated empty-check logic (`compareEnv` and `validateEnv` both compute empties); keep one source of truth.
- Add explicit file existence/error reporting (currently missing files silently become empty maps).
- Consider dotenv-compatible parsing (quoted values, escaped chars, inline comments, `export KEY=...` support).
- Return non-zero exit code on issues (currently commented out), with optional `--strict` mode.
- Add deterministic ordering of output keys for stable CI logs.
- Add tests (unit + snapshot for printer formatting) and CI validation.
- Separate update check failure handling (`try/catch` inside async callback) to avoid unhandled async errors.
- Add machine-readable output mode (`--json`) for CI/tool integration.
