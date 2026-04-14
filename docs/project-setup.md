# Project Setup Guide

This document walks through the steps to scaffold the `case-converter-react` project from scratch.

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

## 2. Add Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.ts` to include the Tailwind plugin and a path alias:

```ts
/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/case-converter-react/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
```

Add the path alias to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

And to `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "ignoreDeprecations": "6.0"
  }
}
```

Replace `src/index.css` with Tailwind imports and a custom violet/indigo theme using `oklch` colors for both light and dark modes. See the source file for the full theme definition.

## 3. Add shadcn/ui

Initialize shadcn:

```bash
npx shadcn@latest init -d
```

Add the required components:

```bash
npx shadcn@latest add card textarea badge separator tooltip
```

Install icons:

```bash
npm install lucide-react
```

Wrap the app with `TooltipProvider` in `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </StrictMode>,
)
```

## 4. Build the Case Converter

### 4.1 Conversion Logic

Create `src/lib/converters/index.ts` with 31 case conversion functions organized into 4 groups:

| Group | Color | Cases |
|---|---|---|
| General | Violet | UPPERCASE, lowercase, Sentence case, Title Case, Capitalize Words, InVeRsE, SwAp CaSe, aLtErNaTiNg, SpOnGe CaSe |
| Programming | Sky | camelCase, PascalCase, snake_case, CONSTANT_CASE, MACRO_CASE, flatcase, UPPERFLATCASE, camel_Snake_Case, Pascal_Snake_Case |
| Delimiter | Emerald | kebab-case, hyphen-case, dot.case, path/case, space case, no case |
| Specialized | Amber | Header-Case, Train-Case, Ada_Case, COBOL-CASE, UPPER-KEBAB, UPPER.DOT, Capital.Dot |

Each group exports a `color` and `activeColor` for the UI to render color-coded buttons.

### 4.2 UI Component

Create `src/components/CaseConverter.tsx` with:

- Gradient background (violet → sky) with backdrop blur on cards
- Header with gradient logo icon and gradient text title
- Dark/light theme toggle (respects system preference via `matchMedia`)
- **Input card** — textarea with paste/clear actions and color-coded stat badges (paragraphs, words, characters)
- **Convert to card** — 2-column responsive grid of 4 color-coded group panels, each with labeled buttons and tooltips showing example output
- **Output card** — read-only textarea with active case badge, swap (output → input), and copy-to-clipboard actions

### 4.3 App Entry

Update `src/App.tsx`:

```tsx
import CaseConverter from '@/components/CaseConverter'

function App() {
  return <CaseConverter />
}

export default App
```

## 5. Add Unit Tests

### 5.1 Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

| Package | Purpose |
|---|---|
| `vitest` | Vite-native test runner |
| `@testing-library/react` | Utilities for testing React components |
| `@testing-library/jest-dom` | Custom matchers like `toBeInTheDocument()` |
| `jsdom` | Browser-like DOM environment for tests |

### 5.2 Configure Vitest

The test configuration is already in `vite.config.ts` (see step 2). Add `vitest/globals` to the types in `tsconfig.app.json`:

```json
"types": ["vite/client", "vitest/globals"]
```

### 5.3 Create the Setup File

Create `src/setupTests.ts` with jest-dom matchers and a `matchMedia` mock (required because jsdom doesn't implement `window.matchMedia`):

```ts
import '@testing-library/jest-dom'

Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
```

### 5.4 Write a Test

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import App from './App'

test('renders app', () => {
  render(
    <TooltipProvider>
      <App />
    </TooltipProvider>
  )
  expect(screen.getByText(/case converter/i)).toBeInTheDocument()
})
```

> **Note:** The app must be wrapped in `TooltipProvider` in tests, matching the production setup in `main.tsx`.

### 5.5 Run Tests

```bash
# Run once
npm test -- --run

# Run in watch mode
npm test
```

## 6. Project Structure

```
case-converter-react/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment
├── docs/
│   ├── hld.md
│   ├── project-setup.md
│   └── scaffolds.md
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   └── CaseConverter.tsx
│   ├── lib/
│   │   ├── converters/
│   │   │   └── index.ts     # 31 case conversion functions
│   │   └── utils.ts         # shadcn cn() utility
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.css            # Tailwind + theme variables
│   ├── main.tsx
│   └── setupTests.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── components.json          # shadcn/ui config
```

## 7. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests in watch mode |

## 8. Deploy to GitHub Pages

### 8.1 Set the Base Path

Add `base` to `vite.config.ts` so assets resolve correctly under the repo subpath:

```ts
export default defineConfig({
  base: '/case-converter-react/',
  // ...
})
```

> **Note:** If your repo name differs, update the `base` value to match: `base: '/<repo-name>/'`

### 8.2 Create the GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm test -- --run
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The workflow runs on every push to `main`:
1. Installs dependencies (`npm ci`)
2. Runs unit tests
3. Builds for production
4. Deploys the `dist/` folder to GitHub Pages

### 8.3 Enable GitHub Pages

1. Push the code to a GitHub repo
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. The workflow triggers automatically on push to `main`

The site will be live at: `https://<username>.github.io/case-converter-react/`
