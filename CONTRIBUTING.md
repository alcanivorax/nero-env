## Contributing to nero-env

Thanks for your interest in contributing to nero-env!

### How to contribute

1. Fork the repo
2. Create a branch (use a descriptive name)
3. Make your changes
4. Open a pull request

Small, focused PRs are preferred.

### Picking issues

Issues labeled `good first issue` or `help wanted` are open for anyone to work on.
If an issue is unassigned, feel free to take it.

## Local Development Setup

### Prerequisites

- **Node.js ≥ 18**
- **pnpm**

  Install pnpm: https://pnpm.io/installation

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
