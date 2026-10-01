# Agent Guide

## Code quality

- After making code changes, run `npm run check` (runs `vp check --fix` — formats, lints, and type-checks, auto-fixing what it can).
- Before finishing, run `npm run lint -- --deny-warnings --format=agent` (zero-warning gate; fails on any lint warning).
- Define each project-owned React component's props as a named `ComponentNameProps` type outside the component function, accept the object as `props: ComponentNameProps`, and access values through `props`. When ref-valued props trigger `react-hooks/refs`, destructure only those refs and collect the remaining values as `...props` (for example, `{ frameRef, panelRef, ...props }`). Exclude shadcn-owned source in `src/components/**` and `registry/**`.
- Keep project-owned JSX props readable: `key`/`ref` first, identity and accessibility props next, content and configuration props after those, visual props and `className` near the end, and event handlers last. Preserve prop-spread positions because their order affects overrides. Exclude shadcn-owned source in `src/components/**` and `registry/**`.

## Commits

- When creating or amending a commit, use Conventional Commits: `<type>(<optional scope>): <description>` (omit the parentheses when there is no scope). Check recent `git log` subjects to match the repository's types and scopes, and use a concise imperative description. Example: `feat(registry): add configured preview heights and sticky toolbars`.

## Frontend testing

- Before adding or changing frontend component/browser or E2E tests, read `docs/agents/frontend-testing.md`.

## Agent skills

### Issue tracker

Issues live as GitHub issues in `boningmaple/shadcn-studio`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
