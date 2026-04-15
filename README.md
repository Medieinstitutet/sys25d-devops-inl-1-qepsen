# Salary Calculator

A client-side web application that calculates take-home pay after Swedish taxes. Built with Vite and tested with Vitest. The project is automatically tested, built, and deployed to GitHub Pages via a GitHub Actions CI/CD pipeline on every push to the main branch.

## Live demo

The application is available at:

```
https://medieinstitutet.github.io/sys25d-devops-inl-1-qepsen/
```

## What the application does

The user enters a gross monthly salary in SEK. The calculator applies the following simplified Swedish tax rules and displays a full breakdown:

- Municipal tax: 32% of gross salary
- State income tax: 20% of the amount exceeding 51 158 SEK/month
- Pension fee: 7% of gross salary
- Job tax deduction: 13% of gross salary

## Project structure

```
salary-calc/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── salary.js
│   ├── salary.test.js
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## Getting started locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the unit tests:

```bash
npm run test
```

Build the production bundle:

```bash
npm run build
```

## CI/CD pipeline

The pipeline is defined in `.github/workflows/deploy.yml` and runs automatically on every push to `main`. It consists of three sequential jobs:

**test** — Installs dependencies and runs all unit tests with Vitest. If any test fails, the pipeline stops and neither of the following jobs runs.

**build** — Runs only if `test` passed. Compiles the application with Vite and uploads the output directory as a GitHub Pages artifact.

**deploy** — Runs only if `build` passed. Publishes the artifact to GitHub Pages using the official `actions/deploy-pages` action.

The sequential dependency is enforced with the `needs` keyword in the workflow file. This guarantees that a failing test always prevents a broken build from reaching production.

## Tech stack
 
- Vite — build tool and dev server
- Vitest — unit testing
- GitHub Actions — CI/CD pipeline
- GitHub Pages — deployment

## Configuration

One setting must be updated before the first deploy. Open `vite.config.js` and set `base` to match your repository name:

```js
base: '/sys25d-devops-inl-1-qepsen/',
```
