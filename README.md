# nero-env

A simple CLI tool to validate environment variables in a project.

nero-env compares your active .env file with .env.example and reports:

- missing variables
- empty values
- unused variables

Clear output. No configuration. Safe by default.

## Installation

```bash
npm install -g nero-env
```

## Usage

```bash
nero-env
```

Check a specific project:

```bash
nero-env --path ./apps/api
```

<!-- Fail on issues (useful for CI):
```bash
nero-env --strict
```

Use a specific env file:
```bash
nero-env --env development
``` -->

## What it checks

- **Missing** → defined in .env.example but not in .env
- **Empty** → defined but has no value
- **Unused** → present in .env but not declared in .env.example

Output clearly shows which file needs fixing.
