import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Copy, Check, Trash2, ClipboardPaste, ArrowDownUp,
  Sun, Moon, Type,
} from 'lucide-react'
import { caseGroups, allCases } from '@/lib/converters'

const groupLabelColors: Record<string, string> = {
  violet: 'text-violet-600 dark:text-violet-400',
  sky: 'text-sky-600 dark:text-sky-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  amber: 'text-amber-600 dark:text-amber-400',
}

const groupBorderColors: Record<string, string> = {
  violet: 'border-violet-200 dark:border-violet-800/50',
  sky: 'border-sky-200 dark:border-sky-800/50',
  emerald: 'border-emerald-200 dark:border-emerald-800/50',
  amber: 'border-amber-200 dark:border-amber-800/50',
}

const groupBgColors: Record<string, string> = {
  violet: 'bg-violet-50/50 dark:bg-violet-950/20',
  sky: 'bg-sky-50/50 dark:bg-sky-950/20',
  emerald: 'bg-emerald-50/50 dark:bg-emerald-950/20',
  amber: 'bg-amber-50/50 dark:bg-amber-950/20',
}

const groupDotColors: Record<string, string> = {
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
}

const btnBase = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium h-8 px-3 cursor-pointer transition-all duration-200'
const btnOutline = `${btnBase} border border-border bg-card shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md`
const btnOutlineDisabled = `${btnOutline} disabled:pointer-events-none disabled:opacity-40`

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [activeCase, setActiveCase] = useState('lower')
  const [copied, setCopied] = useState(false)
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const activeConverter = allCases.find((c) => c.id === activeCase)!
  const activeGroup = caseGroups.find((g) => g.cases.some((c) => c.id === activeCase))!
  const output = input ? activeConverter.convert(input) : ''

  const charCount = input.length
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0
  const paraCount = input.trim() ? input.trim().split(/\n\s*\n/).length : 0

  const handleCopy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [output])

  const handlePaste = useCallback(async () => {
    const text = await navigator.clipboard.readText()
    setInput(text)
  }, [])

  const handleClear = useCallback(() => setInput(''), [])
  const handleSwap = useCallback(() => setInput(output), [output])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-background to-sky-50 dark:from-violet-950/30 dark:via-background dark:to-sky-950/30 transition-colors duration-300">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-8 pb-2 sm:pt-12 sm:pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25">
            <Type className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-700 via-indigo-600 to-sky-600 dark:from-violet-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
              Case Converter
            </h1>
            <p className="hidden sm:block text-xs text-muted-foreground">
              Transform text into any case instantly
            </p>
          </div>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card shadow-sm hover:bg-accent transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-violet-600" />}
        </button>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Input Card */}
        <Card className="shadow-lg shadow-violet-500/5 border-border/60 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-sm font-semibold text-foreground">Input</label>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="secondary" className="text-xs font-normal bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border-0">
                  {paraCount} {paraCount === 1 ? 'paragraph' : 'paragraphs'}
                </Badge>
                <Badge variant="secondary" className="text-xs font-normal bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border-0">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </Badge>
                <Badge variant="secondary" className="text-xs font-normal bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0">
                  {charCount} {charCount === 1 ? 'char' : 'chars'}
                </Badge>
              </div>
            </div>
            <Textarea
              placeholder="Type or paste your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] sm:min-h-[150px] resize-y text-base leading-relaxed border-border/60 focus:border-violet-400 focus:ring-violet-400/20 dark:focus:border-violet-500 dark:focus:ring-violet-500/20 transition-colors"
            />
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger className={btnOutline} onClick={handlePaste}>
                  <ClipboardPaste className="mr-1.5 h-3.5 w-3.5 text-violet-500" />
                  Paste
                </TooltipTrigger>
                <TooltipContent>Paste from clipboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className={btnOutlineDisabled} onClick={handleClear} disabled={!input}>
                  <Trash2 className="mr-1.5 h-3.5 w-3.5 text-rose-500" />
                  Clear
                </TooltipTrigger>
                <TooltipContent>Clear input</TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Options */}
        <Card className="shadow-lg shadow-indigo-500/5 border-border/60 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <label className="text-sm font-semibold text-foreground">Convert to</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseGroups.map((group) => (
                <div
                  key={group.name}
                  className={`rounded-xl border p-3 space-y-2.5 transition-colors ${groupBorderColors[group.color]} ${groupBgColors[group.color]}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${groupDotColors[group.color]}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${groupLabelColors[group.color]}`}>
                      {group.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.cases.map((c) => (
                      <Tooltip key={c.id}>
                        <TooltipTrigger
                          className={`${btnBase} text-xs h-7 px-2.5 ${
                            activeCase === c.id
                              ? `${group.activeColor} shadow-md`
                              : 'bg-white dark:bg-white/5 border border-border/50 text-foreground hover:shadow-md hover:border-border'
                          }`}
                          onClick={() => setActiveCase(c.id)}
                        >
                          {c.label}
                        </TooltipTrigger>
                        <TooltipContent>{c.example}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Output Card */}
        <Card className="shadow-lg shadow-sky-500/5 border-border/60 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-foreground">Output</label>
                <Badge className={`text-xs font-normal border-0 ${activeGroup.activeColor}`}>
                  {activeConverter.label}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Tooltip>
                  <TooltipTrigger className={btnOutlineDisabled} onClick={handleSwap} disabled={!output}>
                    <ArrowDownUp className="mr-1.5 h-3.5 w-3.5 text-indigo-500" />
                    <span className="hidden sm:inline">Use as input</span>
                    <span className="sm:hidden">Swap</span>
                  </TooltipTrigger>
                  <TooltipContent>Move output to input</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger className={btnOutlineDisabled} onClick={handleCopy} disabled={!output}>
                    {copied ? (
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="mr-1.5 h-3.5 w-3.5 text-violet-500" />
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                  </TooltipTrigger>
                  <TooltipContent>Copy to clipboard</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Textarea
              readOnly
              value={output}
              placeholder="Converted text will appear here..."
              className="min-h-[120px] sm:min-h-[150px] resize-y text-base leading-relaxed bg-muted/30 border-border/60"
            />
          </CardContent>
        </Card>

        <Separator className="opacity-40" />

        <p className="text-center text-xs text-muted-foreground pb-4">
          Built with React + Vite + shadcn/ui
        </p>
      </main>
    </div>
  )
}
