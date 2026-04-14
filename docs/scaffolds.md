# Project Scaffolds

This project was scaffolded with the `react-ts` Vite template and extended with Tailwind CSS, shadcn/ui, and Vitest.

## Vite Template

```bash
npm create vite@latest case-converter-react -- --template react-ts
```

Two official React plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs) (used in this project)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Dependencies Added

### Runtime

| Package | Purpose |
|---|---|
| `tailwindcss` | Utility-first CSS framework |
| `@tailwindcss/vite` | Tailwind CSS Vite plugin |
| `shadcn` | Component library CLI |
| `@base-ui/react` | Headless primitives (used by shadcn tooltip) |
| `@fontsource-variable/geist` | Geist font |
| `class-variance-authority` | Variant styling for components |
| `clsx` + `tailwind-merge` | Class name utilities |
| `tw-animate-css` | Animation utilities |
| `lucide-react` | Icon library |

### Dev

| Package | Purpose |
|---|---|
| `vitest` | Vite-native test runner |
| `@testing-library/react` | React component testing utilities |
| `@testing-library/jest-dom` | Custom DOM matchers |
| `jsdom` | Browser DOM simulation for tests |

## shadcn/ui Components

Installed via `npx shadcn@latest add`:

- `button` — action buttons
- `card` — input, conversion, and output sections
- `textarea` — text input/output areas
- `badge` — stat counters and active case label
- `separator` — visual dividers
- `tooltip` — hover hints with example output

## ESLint Configuration

The project uses flat ESLint config with TypeScript and React plugins:

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

To enable stricter type-aware lint rules for production:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## React Compiler

Not enabled in this template due to dev/build performance impact. See [React Compiler installation docs](https://react.dev/learn/react-compiler/installation) to add it.

## GitHub Pages Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to GitHub Pages on every push to `main`.

The `base` option in `vite.config.ts` is set to `/case-converter-react/` so asset paths resolve correctly under the repo subpath.

See [Project Setup Guide — Deploy to GitHub Pages](project-setup.md#8-deploy-to-github-pages) for full details.
