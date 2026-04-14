# I Built a Text Case Converter with 31 Formats — Here's What I Learned

Ever needed to quickly convert text to camelCase, snake_case, or CONSTANT_CASE? I built a free, open-source tool that handles 31 case formats — and I want to share the journey.

🔗 **Live demo:** https://mrnbt7.github.io/case-converter-react/
📦 **Source code:** https://github.com/mrnbt7/case-converter-react

---

## The Problem

As developers, we constantly switch between naming conventions. Variable names in JavaScript use camelCase. Python prefers snake_case. Environment variables demand CONSTANT_CASE. HTTP headers use Header-Case. And that's just the beginning.

I wanted a single tool that handles all of them — fast, beautiful, and without leaving the browser.

## What I Built

A responsive, single-page text case converter supporting **31 case formats** organized into 4 color-coded categories:

🟣 **General** — UPPERCASE, lowercase, Sentence case, Title Case, Capitalize Words, InVeRsE, SwAp CaSe, aLtErNaTiNg, SpOnGe CaSe

🔵 **Programming** — camelCase, PascalCase, snake_case, CONSTANT_CASE, MACRO_CASE, flatcase, UPPERFLATCASE, camel_Snake_Case, Pascal_Snake_Case

🟢 **Delimiter** — kebab-case, hyphen-case, dot.case, path/case, space case, no case

🟡 **Specialized** — Header-Case, Train-Case, Ada_Case, COBOL-CASE, UPPER-KEBAB, UPPER.DOT, Capital.Dot

### Key Features

- ✨ Live paragraph, word, and character counts
- 📋 One-click copy, paste, clear, and swap (output → input)
- 🌙 Dark/light theme toggle that respects your system preference
- 📱 Fully responsive — works great on mobile and desktop
- 💡 Tooltips showing example output for every case type

## The Tech Stack

I chose a modern, lightweight stack that prioritizes developer experience and performance:

| Technology | Why I Chose It |
|---|---|
| **React 19** | Latest features, great ecosystem |
| **TypeScript 6** | Catch bugs before they ship |
| **Vite 8** | Instant HMR, fast builds |
| **Tailwind CSS 4** | Rapid styling with utility classes |
| **shadcn/ui** | Beautiful, accessible components I own |
| **Vitest** | Vite-native testing, zero config friction |

The entire app is **client-side only** — no backend, no API calls. Everything runs in the browser.

## Architecture Decisions

### Pure Functions for Conversions

Every case converter is a pure function: string in, string out. This makes them trivial to test and compose:

```typescript
const words = (text: string) =>
  text.match(/[a-zA-Z0-9]+/g) ?? []

export const toKebabCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join('-')
```

All 31 converters follow the same pattern: **tokenize → transform → join**. The delimiter and per-word transformation are the only things that change.

### Grouped by Category

Instead of a flat list of 31 buttons, I organized them into 4 groups with distinct colors. Each group is a data object with a name, color theme, and array of cases. The UI renders itself from this data — adding a new case format means adding one object to an array.

### No State Library Needed

With only 4 pieces of state (input text, active case, copied flag, dark mode), React's built-in useState is more than enough. The output is a derived value — no need to store it.

## CI/CD Pipeline

The app auto-deploys to GitHub Pages on every push to `main`:

1. **GitHub Actions** checks out the code
2. Installs dependencies with `npm ci`
3. Runs unit tests — a failing test **blocks deployment**
4. Builds for production
5. Deploys the `dist/` folder to GitHub Pages

The entire pipeline takes under 60 seconds.

## What I Learned

1. **shadcn/ui v4 uses Base UI primitives** — the API is different from v3. No more `asChild` prop on tooltips. Reading the generated component source is essential.

2. **jsdom doesn't implement `window.matchMedia`** — if your component reads system theme preference, you need to mock it in your test setup.

3. **Vite's `base` config matters for GitHub Pages** — without `base: '/<repo-name>/'`, all asset paths break on the deployed site.

4. **Data-driven UI scales well** — defining case groups as data objects meant the UI, tooltips, and color coding all came for free when adding new formats.

5. **Tailwind CSS 4 + oklch colors** — the new oklch color space produces more perceptually uniform colors across light and dark themes.

## Try It Out

The tool is free and open source. Give it a spin:

🔗 **Live demo:** https://mrnbt7.github.io/case-converter-react/
📦 **GitHub:** https://github.com/mrnbt7/case-converter-react

If you find it useful, a ⭐ on GitHub would mean a lot!

---

*What naming convention do you use most? I'd love to hear which case formats you reach for daily. Drop a comment below! 👇*

#React #TypeScript #WebDevelopment #OpenSource #Frontend #Vite #TailwindCSS #JavaScript #DeveloperTools #GitHub
