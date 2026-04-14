# Project Setup Guide

This document walks through the steps to scaffold the `case-converter-react` project and add unit tests.

---

## 1. Create the Project

Scaffold a React + TypeScript project using Vite:

```bash
npm create vite@latest case-converter-react -- --template react-ts
```

Navigate into the project and install dependencies:

```bash
cd case-converter-react
npm install
```

This generates the following project structure:

```
case-converter-react/
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── assets/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── vite.config.ts
```

## 2. Run the Dev Server

```bash
npm run dev
```

This starts the Vite dev server with Hot Module Replacement (HMR).

## 3. Add Unit Tests

### 3.1 Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

| Package | Purpose |
|---|---|
| `vitest` | Vite-native test runner |
| `@testing-library/react` | Utilities for testing React components |
| `@testing-library/jest-dom` | Custom matchers like `toBeInTheDocument()` |
| `jsdom` | Browser-like DOM environment for tests |

### 3.2 Configure Vitest

Update `vite.config.ts` to include the test configuration:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
```

- `globals: true` — enables global test functions (`test`, `expect`, `describe`) without imports
- `environment: 'jsdom'` — simulates a browser DOM
- `setupFiles` — runs before each test file

### 3.3 Create the Setup File

Create `src/setupTests.ts`:

```ts
import '@testing-library/jest-dom'
```

This makes matchers like `toBeInTheDocument()` available in all tests.

### 3.4 Add a Test Script

Add the `test` script to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest"
}
```

### 3.5 Write a Test

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders app', () => {
  render(<App />)
  expect(screen.getByText(/get started/i)).toBeInTheDocument()
})
```

> **Tip:** When querying by text, make sure the regex matches a single element. Use `getAllByText` if multiple matches are expected, or use a more specific query like `getByRole` to avoid ambiguity.

### 3.6 Run Tests

```bash
# Run once
npm test -- --run

# Run in watch mode
npm test
```

## 4. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests in watch mode |
