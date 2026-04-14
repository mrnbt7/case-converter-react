# Case Converter React

A beautiful, responsive text case converter built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Supports 31 case formats across 4 categories with dark/light theme toggle, clipboard actions, and live text stats.

## Features

- 31 case conversions grouped into 4 color-coded categories
  - **General** (violet) — UPPERCASE, lowercase, Sentence case, Title Case, Capitalize Words, InVeRsE, SwAp CaSe, aLtErNaTiNg, SpOnGe CaSe
  - **Programming** (sky) — camelCase, PascalCase, snake_case, CONSTANT_CASE, MACRO_CASE, flatcase, UPPERFLATCASE, camel_Snake_Case, Pascal_Snake_Case
  - **Delimiter** (emerald) — kebab-case, hyphen-case, dot.case, path/case, space case, no case
  - **Specialized** (amber) — Header-Case, Train-Case, Ada_Case, COBOL-CASE, UPPER-KEBAB, UPPER.DOT, Capital.Dot
- Live paragraph, word, and character counts
- Copy, paste, clear, and swap (output → input) actions
- Dark/light theme toggle (respects system preference)
- Fully responsive layout (mobile → desktop)
- Tooltips with example output for each case type

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript 6 | Type safety |
| Vite 8 | Build tool with HMR |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Component library (Card, Textarea, Badge, Separator, Tooltip) |
| Lucide React | Icons |
| Vitest | Unit testing |
| React Testing Library | Component testing |

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

The app auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

Live at: `https://<username>.github.io/case-converter-react/`

See [Project Setup Guide — Deploy to GitHub Pages](docs/project-setup.md#8-deploy-to-github-pages) for setup instructions.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests in watch mode |

## Docs

- [High-Level Design](docs/hld.md) — Architecture, data flow, component hierarchy, and mermaid diagrams
- [Project Setup Guide](docs/project-setup.md) — Step-by-step instructions for scaffolding the project, adding shadcn/ui, Tailwind CSS, unit tests, and GitHub Pages deployment
- [Project Scaffolds](docs/scaffolds.md) — Vite template details, dependencies, and ESLint configuration
