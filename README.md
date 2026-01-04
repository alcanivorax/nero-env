# nero-env

A simple CLI tool to validate environment variables in a project.

nero-env compares your active .env file with .env.example and reports:

- missing variables
- empty values
- unused variables

Clear output. No configuration. Safe by default.

## Example

<img 
  src="https://raw.githubusercontent.com/alcanivorax/nero-env/main/assets/nero-env-preview.png"
  width="700"
/>

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

## What it checks

- **Missing** → defined in .env.example but not in .env
- **Empty** → defined but has no value
- **Unused** → present in .env but not declared in .env.example

Output clearly shows which file needs fixing.

## Local Development Setup

### Prerequisites

- **pnpm**

  Install pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

1. **Fork the repo**

2. **Clone your fork**

   ```bash
   git clone https://github.com/<username>/nero-env.git
   ```

3. **Move to the project root directory**

   ```bash
   cd nero-env
   ```

4. **Install dependencies**

   ```bash
   pnpm install
   ```

5. **Build the project**

   ```bash
   pnpm build
   ```

## Running the CLI locally (using npm link)

**To test nero-env as a global command during development:**

1. Link the package

   ```bash
   npm link
   ```

2. Run the CLI

   ```bash
   nero-env
   ```

3. After making changes

   ```bash
   pnpm build
   ```

The linked command will automatically use the updated build.

---

**Unlinking (cleanup)**

When you’re done:

```bash
npm unlink
```
