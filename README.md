<h1 align="center">nero-env</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/nero-env?color=6366f1" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/nero-env?color=0f172a" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/alcanivorax/nero-env?color=22c55e" alt="license" />
</p>

A simple CLI tool to validate environment variables in your project.

## Overview

nero-env compares your active `.env` file with `.env.example` and reports discrepancies. It helps ensure your environment configuration is complete and accurate.

**What it checks:**

- **Missing variables** - defined in `.env.example` but not in `.env`
- **Empty values** - defined in `.env` but has no value assigned
- **Unused variables** - present in `.env` but not declared in `.env.example`

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

## What it checks

- **Missing** → defined in .env.example but not in .env
- **Empty** → defined but has no value
- **Unused** → present in .env but not declared in .env.example

Output clearly shows which file needs fixing.
