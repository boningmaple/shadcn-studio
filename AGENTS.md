# Agent Guide

## Code quality

- After making code changes, run `npm run check` (runs `vp check --fix` — formats, lints, and type-checks, auto-fixing what it can).
- Before finishing, run `npm run lint -- --deny-warnings --format=agent` (zero-warning gate; fails on any lint warning).

## Frontend testing

- Before adding or changing frontend component/browser or E2E tests, read `docs/agents/frontend-testing.md`.

## Agent skills

### Issue tracker

Issues live as GitHub issues in `boningmaple/shadcn-studio`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
