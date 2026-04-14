# High-Level Design — Case Converter React

## 1. System Overview

A single-page client-side application that converts text between 31 case formats. No backend or API calls — all logic runs in the browser.

```mermaid
graph LR
    User([User]) -->|types / pastes text| App[Case Converter SPA]
    App -->|converted text| User
    App -->|reads / writes| Clipboard[(Clipboard API)]

    subgraph Browser
        App
        Clipboard
        LocalPref[(System Theme Preference)]
    end

    App -->|reads| LocalPref
```

## 2. Architecture Layers

```mermaid
graph TD
    subgraph Presentation["Presentation Layer"]
        Main["main.tsx<br/><small>Entry point + TooltipProvider</small>"]
        AppComp["App.tsx<br/><small>Root component</small>"]
        CC["CaseConverter.tsx<br/><small>Main UI</small>"]
        UI["shadcn/ui Components<br/><small>Card, Textarea, Badge,<br/>Separator, Tooltip</small>"]
        Icons["Lucide React<br/><small>Icons</small>"]
    end

    subgraph Logic["Business Logic Layer"]
        Conv["converters/index.ts<br/><small>31 conversion functions<br/>4 grouped categories</small>"]
    end

    subgraph Styling["Styling Layer"]
        TW["Tailwind CSS 4<br/><small>Utility classes</small>"]
        Theme["index.css<br/><small>oklch theme variables<br/>Light + Dark</small>"]
    end

    subgraph Build["Build Layer"]
        Vite["Vite 8<br/><small>Dev server + HMR + Build</small>"]
        TS["TypeScript 6<br/><small>Type checking</small>"]
        Vitest["Vitest<br/><small>Unit tests</small>"]
    end

    Main --> AppComp --> CC
    CC --> UI
    CC --> Icons
    CC --> Conv
    CC --> TW
    TW --> Theme
    Vite --> Main
    TS --> Vite
    Vitest --> CC
```

## 3. Component Hierarchy

```mermaid
graph TD
    Root["StrictMode"]
    TP["TooltipProvider"]
    App["App"]
    CC["CaseConverter"]

    Root --> TP --> App --> CC

    CC --> Header["Header<br/><small>Logo + Title + Theme Toggle</small>"]
    CC --> InputCard["Input Card"]
    CC --> ConvertCard["Convert To Card"]
    CC --> OutputCard["Output Card"]

    InputCard --> StatBadges["Stat Badges<br/><small>paragraphs · words · chars</small>"]
    InputCard --> InputArea["Textarea"]
    InputCard --> InputActions["Paste · Clear"]

    ConvertCard --> GeneralGroup["General Group<br/><small>violet · 9 cases</small>"]
    ConvertCard --> ProgrammingGroup["Programming Group<br/><small>sky · 9 cases</small>"]
    ConvertCard --> DelimiterGroup["Delimiter Group<br/><small>emerald · 6 cases</small>"]
    ConvertCard --> SpecializedGroup["Specialized Group<br/><small>amber · 7 cases</small>"]

    OutputCard --> ActiveBadge["Active Case Badge"]
    OutputCard --> OutputArea["Textarea (read-only)"]
    OutputCard --> OutputActions["Swap · Copy"]
```

## 4. Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant CC as CaseConverter
    participant S as React State
    participant Conv as Converter Function
    participant CB as Clipboard API

    U->>CC: Types text in input
    CC->>S: setInput(text)
    S-->>CC: Re-render
    CC->>Conv: activeConverter.convert(input)
    Conv-->>CC: Converted output
    CC-->>U: Display output + stats

    U->>CC: Clicks case button
    CC->>S: setActiveCase(id)
    S-->>CC: Re-render
    CC->>Conv: newConverter.convert(input)
    Conv-->>CC: Converted output
    CC-->>U: Display output

    U->>CC: Clicks Copy
    CC->>CB: navigator.clipboard.writeText(output)
    CC->>S: setCopied(true)
    CC-->>U: "Copied!" feedback

    U->>CC: Clicks Paste
    CC->>CB: navigator.clipboard.readText()
    CB-->>CC: Clipboard text
    CC->>S: setInput(text)

    U->>CC: Clicks Swap
    CC->>S: setInput(output)
    S-->>CC: Re-render with output as new input
```

## 5. State Management

All state lives in the `CaseConverter` component via `useState`. No external state library is needed.

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Typing: User types
    Typing --> Converting: input changes
    Converting --> Displaying: output computed
    Displaying --> Idle: Waiting

    Idle --> CaseSwitch: User clicks case button
    CaseSwitch --> Converting: activeCase changes

    Displaying --> Copied: User clicks Copy
    Copied --> Displaying: 1.5s timeout

    Displaying --> Swapped: User clicks Swap
    Swapped --> Converting: input = output
```

| State | Type | Default | Purpose |
|---|---|---|---|
| `input` | `string` | `''` | User's source text |
| `activeCase` | `string` | `'lower'` | Selected conversion ID |
| `copied` | `boolean` | `false` | Copy feedback flag |
| `dark` | `boolean` | System pref | Theme toggle |

Derived values (no state needed):
- `output` — computed from `activeConverter.convert(input)`
- `charCount`, `wordCount`, `paraCount` — computed from `input`

## 6. Conversion Pipeline

```mermaid
graph LR
    Input["Raw Text<br/><small>'Hello World'</small>"]
    Tokenize["Tokenize<br/><small>regex: /[a-zA-Z0-9]+/g</small>"]
    Transform["Transform<br/><small>per-word mapping</small>"]
    Join["Join<br/><small>delimiter varies</small>"]
    Output["Result"]

    Input --> Tokenize --> Transform --> Join --> Output

    style Input fill:#f3e8ff,stroke:#7c3aed
    style Output fill:#ecfdf5,stroke:#059669
```

### Conversion Groups

```mermaid
graph TD
    subgraph General["🟣 General — 9 cases"]
        G1["UPPERCASE"]
        G2["lowercase"]
        G3["Sentence case"]
        G4["Title Case"]
        G5["Capitalize Words"]
        G6["InVeRsE"]
        G7["SwAp CaSe"]
        G8["aLtErNaTiNg"]
        G9["SpOnGe CaSe"]
    end

    subgraph Programming["🔵 Programming — 9 cases"]
        P1["camelCase"]
        P2["PascalCase"]
        P3["snake_case"]
        P4["CONSTANT_CASE"]
        P5["MACRO_CASE"]
        P6["flatcase"]
        P7["UPPERFLATCASE"]
        P8["camel_Snake_Case"]
        P9["Pascal_Snake_Case"]
    end

    subgraph Delimiter["🟢 Delimiter — 6 cases"]
        D1["kebab-case"]
        D2["hyphen-case"]
        D3["dot.case"]
        D4["path/case"]
        D5["space case"]
        D6["no case"]
    end

    subgraph Specialized["🟡 Specialized — 7 cases"]
        S1["Header-Case"]
        S2["Train-Case"]
        S3["Ada_Case"]
        S4["COBOL-CASE"]
        S5["UPPER-KEBAB"]
        S6["UPPER.DOT"]
        S7["Capital.Dot"]
    end

    style General fill:#f5f3ff,stroke:#8b5cf6
    style Programming fill:#f0f9ff,stroke:#0ea5e9
    style Delimiter fill:#ecfdf5,stroke:#10b981
    style Specialized fill:#fffbeb,stroke:#f59e0b
```

## 7. Theme System

```mermaid
graph TD
    SysPref["System Preference<br/><small>matchMedia('prefers-color-scheme: dark')</small>"]
    Toggle["Theme Toggle Button<br/><small>Sun / Moon icon</small>"]
    State["dark state<br/><small>boolean</small>"]
    DOM["document.documentElement<br/><small>.classList.toggle('dark')</small>"]
    CSS["index.css<br/><small>:root / .dark variables</small>"]
    TW["Tailwind dark: variant<br/><small>dark:bg-*, dark:text-*</small>"]

    SysPref -->|initial value| State
    Toggle -->|onClick| State
    State -->|useEffect| DOM
    DOM --> CSS
    CSS --> TW

    style SysPref fill:#fef3c7,stroke:#d97706
    style CSS fill:#f3e8ff,stroke:#7c3aed
```

## 8. Build & Test Pipeline

```mermaid
graph LR
    Source["Source Code<br/><small>TypeScript + TSX</small>"]
    TSC["tsc -b<br/><small>Type check</small>"]
    ViteBuild["vite build<br/><small>Bundle + Minify</small>"]
    Dist["dist/<br/><small>Static assets</small>"]

    Source --> TSC --> ViteBuild --> Dist

    Source --> ViteDev["vite dev<br/><small>HMR server</small>"]
    Source --> Vitest["vitest<br/><small>Unit tests</small>"]

    subgraph Test["Test Environment"]
        Vitest --> JSDOM["jsdom"]
        Vitest --> RTL["React Testing Library"]
        Vitest --> Setup["setupTests.ts<br/><small>jest-dom + matchMedia mock</small>"]
    end

    style Dist fill:#ecfdf5,stroke:#059669
    style Test fill:#f0f9ff,stroke:#0ea5e9
```

## 9. CI/CD — GitHub Pages Deployment

```mermaid
graph TD
    Push["git push to main"] --> GHA["GitHub Actions<br/><small>.github/workflows/deploy.yml</small>"]

    subgraph CI["Build Job"]
        Checkout["actions/checkout@v4"]
        SetupNode["actions/setup-node@v4<br/><small>Node 22 + npm cache</small>"]
        Install["npm ci"]
        TestStep["npm test -- --run"]
        BuildStep["npm run build<br/><small>tsc -b && vite build</small>"]
        Upload["actions/upload-pages-artifact@v3<br/><small>dist/</small>"]

        Checkout --> SetupNode --> Install --> TestStep --> BuildStep --> Upload
    end

    subgraph CD["Deploy Job"]
        DeployStep["actions/deploy-pages@v4"]
    end

    GHA --> CI
    CI --> CD
    CD --> Live["Live Site<br/><small>https://&lt;user&gt;.github.io/case-converter-react/</small>"]

    style Push fill:#f3e8ff,stroke:#7c3aed
    style Live fill:#ecfdf5,stroke:#059669
    style CI fill:#f0f9ff,stroke:#0ea5e9
    style CD fill:#fef3c7,stroke:#d97706
```

Key configuration:
- `vite.config.ts` sets `base: '/case-converter-react/'` so assets resolve under the repo subpath
- The workflow uses the newer **GitHub Pages artifact** approach (no `gh-pages` branch needed)
- Tests run before build — a failing test blocks deployment
- `concurrency` ensures only one deployment runs at a time

## 10. File Map

```mermaid
graph TD
    Root["case-converter-react/"]

    Root --> GH[".github/"]
    Root --> Src["src/"]
    Root --> Docs["docs/"]
    Root --> Config["Config Files"]

    GH --> Workflows["workflows/<br/><small>deploy.yml</small>"]

    Src --> Components["components/"]
    Src --> Lib["lib/"]
    Src --> EntryFiles["main.tsx · App.tsx · index.css"]
    Src --> TestFiles["App.test.tsx · setupTests.ts"]

    Components --> UIDir["ui/<br/><small>badge · button · card<br/>separator · textarea · tooltip</small>"]
    Components --> CaseConv["CaseConverter.tsx<br/><small>Main UI component</small>"]

    Lib --> Converters["converters/index.ts<br/><small>31 functions · 4 groups</small>"]
    Lib --> Utils["utils.ts<br/><small>cn() helper</small>"]

    Config --> ViteConf["vite.config.ts"]
    Config --> TSConf["tsconfig.json · .app · .node"]
    Config --> ESLint["eslint.config.js"]
    Config --> ShadcnConf["components.json"]
    Config --> Pkg["package.json"]

    style Src fill:#f5f3ff,stroke:#8b5cf6
    style Components fill:#f0f9ff,stroke:#0ea5e9
    style Lib fill:#ecfdf5,stroke:#10b981
    style Config fill:#fffbeb,stroke:#f59e0b
```
