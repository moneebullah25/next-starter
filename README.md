
---

<p align="center">
  <img src="https://www.svgrepo.com/show/354113/nextjs-icon.svg" height="28px" alt="Next.js Logo" />
</p>

<h1 align="center">NextJS Dockerised</h1>

<p align="center">
  A modern, production-ready <strong>Next.js</strong> starter template powered by <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and fully <strong>Dockerised</strong> for seamless development and deployment.
</p>

---

## 🚀 Features

* ✅ Next.js 15+
* ⚛️ React 19
* 🐶 Husky for Git hooks
* ✨ TypeScript
* 💨 Tailwind CSS
* 🐳 Fully Dockerised
* 🧼 Prettier for consistent formatting
* 🔍 ESLint & Type Checking
* 🤖 GitHub Actions Integration

---

## 📦 Getting Started

This project is designed to run inside Docker containers for both development and production environments.

### ✅ Prerequisites

Make sure the following are installed on your machine:

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## 🐳 Docker Usage & Debugging

### 📄 Environment Variables

Set up your environment variables:

```bash
cp .env.template .env
```

Then update `.env` with your custom values.

### 🚢 Production Deployment

#### Option 1: With Docker Compose

```bash
docker compose --env-file .env.prod -f docker-compose.yml up -d
```

#### Option 2: With NPM Script

```bash
npm run docker:prod
```

To build the Docker image manually:

```bash
npm run docker:prod:build
```

---

## 💻 Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

---

## 🧪 Code Quality

### ✅ Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### ✅ Type Checking

Run TypeScript compiler to verify type safety:

```bash
npm run type-check
```

### ✅ Formatting

Automatically format your code with Prettier:

```bash
npm run format
```

---

## 🔁 Git Hooks

This project uses **Husky** to manage Git hooks.

To install hooks:

```bash
npm run prepare
```

---

Here’s the completed **"🧪 GitHub Actions"** section of your `README.md`, fully describing the workflow based on the YAML you've shared:

---

## 🧪 GitHub Actions

This repository uses GitHub Actions to enforce code quality, build integrity, and containerization validation automatically on pull requests.

### ✅ Workflow: `Next.js Lint, Test, Build, Docker`

Triggered on pull requests (`opened` or `synchronize`), this workflow runs the following jobs:

#### 1. 🔍 **Linting with ESLint**

* Ensures all code follows the defined linting rules.
* Helps maintain consistent code style and catch potential issues early.

#### 2. ✅ **Type Checking with TypeScript**

* Validates type safety across the project using `tsc --noEmit`.

#### 3. 🐳 **Docker Build Check**

* Installs Docker Compose CLI plugin manually.
* Builds the production Docker image (`docker:prod:build`) to ensure the container setup works correctly and won't fail on deploy.

#### 4. 💬 **Automatic PR Feedback**

* If any of the above steps fail, a comment is added directly to the pull request:

  > ❌ *Linting or type checking failed. Please fix the issues and push again.*


#### Conventional Commit Format:

```text
<type>(optional scope): description
```

Where `<type>` is one of:

* `feat`: New features
* `fix`: Bug fixes
* `docs`: Documentation changes
* `refactor`: Code refactoring
* `build`: Build-related changes
* `ci`: CI/CD pipeline updates

### ✅ Linting & Type Check on PRs

* Runs `ESLint` and `tsc` on each PR
* Comments automatically if any checks fail

---

## 📁 Project Structure

```
/app        - Next.js app directory (routing, pages, etc.)
/components - Reusable React components
/context    - Global React context providers
/css        - Global styles and Tailwind config
/hooks      - Custom React hooks
/lib        - Helper libraries or APIs
/types      - TypeScript type definitions
/utils      - Utility functions
```

---

## 📦 Available Scripts

```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"format": "prettier --write .",
"upgrade": "npx ncu -u && npm install",
"type-check": "npx tsc --noEmit",
"docker:prod:build": "docker compose --env-file ./.env.prod -f docker-compose.yml build",
"docker:prod": "docker compose --env-file ./.env.prod -f docker-compose.yml up -d",
"prepare": "husky install"
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
