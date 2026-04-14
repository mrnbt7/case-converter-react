const words = (text: string) =>
  text.match(/[a-zA-Z0-9]+/g) ?? []

// General
export const toUpperCase = (text: string) => text.toUpperCase()
export const toLowerCase = (text: string) => text.toLowerCase()

export const toSentenceCase = (text: string) =>
  text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase())

export const toTitleCase = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

export const toCapitalizeCase = (text: string) =>
  text.replace(/\b\w/g, (c) => c.toUpperCase())

export const toInverseCase = (text: string) =>
  [...text].map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('')

export const toSwapCase = toInverseCase

export const toAlternatingCase = (text: string) => {
  let i = 0
  return [...text]
    .map((c) => {
      if (/[a-zA-Z]/.test(c)) return i++ % 2 === 0 ? c.toLowerCase() : c.toUpperCase()
      return c
    })
    .join('')
}

export const toSpongeCase = (text: string) =>
  [...text]
    .map((c) => {
      if (/[a-zA-Z]/.test(c)) return Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()
      return c
    })
    .join('')

// Programming
export const toCamelCase = (text: string) =>
  words(text)
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('')

export const toPascalCase = (text: string) =>
  words(text).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')

export const toSnakeCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join('_')

export const toConstantCase = (text: string) =>
  words(text).map((w) => w.toUpperCase()).join('_')

export const toMacroCase = toConstantCase

export const toFlatCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join('')

export const toUpperFlatCase = (text: string) =>
  words(text).map((w) => w.toUpperCase()).join('')

// Delimiter
export const toKebabCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join('-')

export const toHyphenCase = toKebabCase

export const toDotCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join('.')

export const toPathCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join('/')

export const toSpaceCase = (text: string) =>
  words(text).map((w) => w.toLowerCase()).join(' ')

export const toNoCase = toSpaceCase

// Specialized
export const toHeaderCase = (text: string) =>
  words(text).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('-')

export const toTrainCase = toHeaderCase

export const toAdaCase = (text: string) =>
  words(text).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('_')

export const toCobolCase = (text: string) =>
  words(text).map((w) => w.toUpperCase()).join('-')

export const toPascalSnakeCase = (text: string) =>
  words(text).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('_')

export const toCamelSnakeCase = (text: string) =>
  words(text)
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('_')

export const toUpperKebabCase = (text: string) =>
  words(text).map((w) => w.toUpperCase()).join('-')

export const toUpperSnakeCase = toConstantCase

export const toUpperDotCase = (text: string) =>
  words(text).map((w) => w.toUpperCase()).join('.')

export const toCapitalDotCase = (text: string) =>
  words(text).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('.')

export type CaseType = {
  id: string
  label: string
  convert: (text: string) => string
  example: string
}

export type CaseGroup = {
  name: string
  color: string
  activeColor: string
  cases: CaseType[]
}

export const caseGroups: CaseGroup[] = [
  {
    name: 'General',
    color: 'violet',
    activeColor: 'bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400',
    cases: [
      { id: 'upper', label: 'UPPERCASE', convert: toUpperCase, example: 'HELLO WORLD' },
      { id: 'lower', label: 'lowercase', convert: toLowerCase, example: 'hello world' },
      { id: 'sentence', label: 'Sentence case', convert: toSentenceCase, example: 'Hello world' },
      { id: 'title', label: 'Title Case', convert: toTitleCase, example: 'Hello World' },
      { id: 'capitalize', label: 'Capitalize Words', convert: toCapitalizeCase, example: 'Hello World' },
      { id: 'inverse', label: 'InVeRsE', convert: toInverseCase, example: 'hELLO wORLD' },
      { id: 'swap', label: 'SwAp CaSe', convert: toSwapCase, example: 'hELLO wORLD' },
      { id: 'alternating', label: 'aLtErNaTiNg', convert: toAlternatingCase, example: 'hElLo WoRlD' },
      { id: 'sponge', label: 'SpOnGe CaSe', convert: toSpongeCase, example: 'hElLO wOrld' },
    ],
  },
  {
    name: 'Programming',
    color: 'sky',
    activeColor: 'bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400',
    cases: [
      { id: 'camel', label: 'camelCase', convert: toCamelCase, example: 'helloWorld' },
      { id: 'pascal', label: 'PascalCase', convert: toPascalCase, example: 'HelloWorld' },
      { id: 'snake', label: 'snake_case', convert: toSnakeCase, example: 'hello_world' },
      { id: 'constant', label: 'CONSTANT_CASE', convert: toConstantCase, example: 'HELLO_WORLD' },
      { id: 'macro', label: 'MACRO_CASE', convert: toMacroCase, example: 'HELLO_WORLD' },
      { id: 'flat', label: 'flatcase', convert: toFlatCase, example: 'helloworld' },
      { id: 'upperflat', label: 'UPPERFLATCASE', convert: toUpperFlatCase, example: 'HELLOWORLD' },
      { id: 'camelsnake', label: 'camel_Snake_Case', convert: toCamelSnakeCase, example: 'hello_World' },
      { id: 'pascalsnake', label: 'Pascal_Snake_Case', convert: toPascalSnakeCase, example: 'Hello_World' },
    ],
  },
  {
    name: 'Delimiter',
    color: 'emerald',
    activeColor: 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400',
    cases: [
      { id: 'kebab', label: 'kebab-case', convert: toKebabCase, example: 'hello-world' },
      { id: 'hyphen', label: 'hyphen-case', convert: toHyphenCase, example: 'hello-world' },
      { id: 'dot', label: 'dot.case', convert: toDotCase, example: 'hello.world' },
      { id: 'path', label: 'path/case', convert: toPathCase, example: 'hello/world' },
      { id: 'space', label: 'space case', convert: toSpaceCase, example: 'hello world' },
      { id: 'nocase', label: 'no case', convert: toNoCase, example: 'hello world' },
    ],
  },
  {
    name: 'Specialized',
    color: 'amber',
    activeColor: 'bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400',
    cases: [
      { id: 'header', label: 'Header-Case', convert: toHeaderCase, example: 'Hello-World' },
      { id: 'train', label: 'Train-Case', convert: toTrainCase, example: 'Hello-World' },
      { id: 'ada', label: 'Ada_Case', convert: toAdaCase, example: 'Hello_World' },
      { id: 'cobol', label: 'COBOL-CASE', convert: toCobolCase, example: 'HELLO-WORLD' },
      { id: 'upperkebab', label: 'UPPER-KEBAB', convert: toUpperKebabCase, example: 'HELLO-WORLD' },
      { id: 'upperdot', label: 'UPPER.DOT', convert: toUpperDotCase, example: 'HELLO.WORLD' },
      { id: 'capitaldot', label: 'Capital.Dot', convert: toCapitalDotCase, example: 'Hello.World' },
    ],
  },
]

export const allCases = caseGroups.flatMap((g) => g.cases)
