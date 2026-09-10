/* Generate by @shikijs/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric,
} from '@shikijs/types'
import {
  createBundledHighlighter,
  createSingletonShorthands,
} from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'

type BundledLanguage =
  | 'shellscript'
  | 'bash'
  | 'sh'
  | 'shell'
  | 'zsh'
  | 'css'
  | 'html'
  | 'javascript'
  | 'js'
  | 'cjs'
  | 'mjs'
  | 'json'
  | 'markdown'
  | 'md'
  | 'tsx'
  | 'typescript'
  | 'ts'
  | 'cts'
  | 'mts'
type BundledTheme = 'github-light' | 'github-dark'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  shellscript: () => import('@shikijs/langs/shellscript'),
  bash: () => import('@shikijs/langs/shellscript'),
  sh: () => import('@shikijs/langs/shellscript'),
  shell: () => import('@shikijs/langs/shellscript'),
  zsh: () => import('@shikijs/langs/shellscript'),
  css: () => import('@shikijs/langs/css'),
  html: () => import('@shikijs/langs/html'),
  javascript: () => import('@shikijs/langs/javascript'),
  js: () => import('@shikijs/langs/javascript'),
  cjs: () => import('@shikijs/langs/javascript'),
  mjs: () => import('@shikijs/langs/javascript'),
  json: () => import('@shikijs/langs/json'),
  markdown: () => import('@shikijs/langs/markdown'),
  md: () => import('@shikijs/langs/markdown'),
  tsx: () => import('@shikijs/langs/tsx'),
  typescript: () => import('@shikijs/langs/typescript'),
  ts: () => import('@shikijs/langs/typescript'),
  cts: () => import('@shikijs/langs/typescript'),
  mts: () => import('@shikijs/langs/typescript'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
  'github-light': () => import('@shikijs/themes/github-light'),
  'github-dark': () => import('@shikijs/themes/github-dark'),
} as Record<BundledTheme, DynamicImportThemeRegistration>

const createHighlighter = /* @__PURE__ */ createBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createJavaScriptRegexEngine(),
})

const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(
  createHighlighter,
)

export {
  bundledLanguages,
  bundledThemes,
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  createHighlighter,
  getLastGrammarState,
  getSingletonHighlighter,
}
export type { BundledLanguage, BundledTheme, Highlighter }
