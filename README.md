# nero-env

A simple CLI tool to validate environment variables in your project.

## Overview

nero-env compares your active `.env` file with `.env.example` and reports discrepancies. It helps ensure your environment configuration is complete and accurate.

**What it checks:**

* **Missing variables** - defined in `.env.example` but not in `.env`
* **Empty values** - defined in `.env` but has no value assigned
* **Unused variables** - present in `.env` but not declared in `.env.example`

Clear output. No configuration required. Safe by default.

---

## Installation

Install globally using npm:

```bash
npm install -g nero-env
```

---

## Usage

### Basic Usage

Run in your project directory:

```bash
nero-env
```

This will check for `.env` and `.env.example` files in the current directory.

### Check a Specific Project

Specify a custom path:

```bash
nero-env --path ./apps/api
```

## Example

<img 
  src="https://raw.githubusercontent.com/alcanivorax/nero-env/main/assets/nero-env-preview.png"
  width="700"
/>

---

## How It Works

1. Reads `.env.example` to establish the expected environment variables
2. Reads `.env` to check the actual environment configuration
3. Compares both files and identifies:
   - Variables missing from `.env`
   - Variables with empty values in `.env`
   - Variables in `.env` that are not documented in `.env.example`
4. Displays a clear report with actionable information

---

## Local Development Setup

### Prerequisites

* Node.js (version 14 or higher recommended)
* pnpm

**Install pnpm:**

```bash
npm install -g pnpm
```

Or visit: https://pnpm.io/installation

### Setup Steps

1. Fork the repository on GitHub

2. Clone your fork:

```bash
git clone https://github.com/<your-username>/nero-env.git
```

3. Navigate to the project directory:

```bash
cd nero-env
```

4. Install dependencies:

```bash
pnpm install
```

5. Build the project:

```bash
pnpm build
```

---

## Running the CLI Locally

### Using npm link

To test `nero-env` as a global command during development:

1. Link the package globally:

```bash
npm link
```

2. Run the CLI from any directory:

```bash
nero-env
```

3. After making changes to the source code, rebuild:

```bash
pnpm build
```

The linked command will automatically use the updated build.

### Unlinking (Cleanup)

When you're done testing:

```bash
npm unlink
```

This removes the global symlink.

---

## License

This project is licensed under the MIT License.

---

## Support

If you encounter issues or have questions:

* Open an issue on GitHub
* Check existing issues for solutions
* Provide clear reproduction steps when reporting bugs