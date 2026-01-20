<h1 align="center">nero-env</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/nero-env?color=6366f1" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/nero-env?color=0f172a" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/alcanivorax/nero-env?color=22c55e" alt="license" />
</p>

<br />

<p align="center">
  <img
    src="https://raw.githubusercontent.com/alcanivorax/nero-env/main/assets/nero-env-preview.png"
    alt="nero-env preview"
    width="700"
  />
</p>

## What is nero-env?

**nero-env** is a CLI tool for validating and comparing `.env` files against `.env.example`.
It helps catch missing, empty, and unused environment variables early.

<br />

## Installation

Install globally using npm:

```bash
npm install -g nero-env
```

<br/>

### Basic Usage

Run in your project directory:

```bash
nero-env
```

This will check for `.env` and `.env.example` files in the current directory.

<br/>

### Check a Specific Project

Specify a custom path:

```bash
nero-env --path ./apps/api
```

<br />

## What it checks

- **Missing variables** → defined in `.env.example` but not in `.env`
- **Empty values** → defined in `.env` but has no value assigned
- **Unused variables** → present in `.env` but not declared in `.env.example`

Output clearly shows which file needs fixing.
