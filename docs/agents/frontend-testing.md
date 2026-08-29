# Frontend Testing

How agents should split frontend feature coverage between component/browser tests and E2E tests.

Use the Search feature as the reference shape:

- Component/browser reference: `src/features/search/__tests__/search.browser.test.tsx`
- E2E reference: `e2e/search.spec.ts`

Use the repo vocabulary from `CONTEXT.md` in test names and docs: Registry item,
Collection page, Preview, Code preview, Search record, Hit, and Quick link.

## Coverage Split

Component/browser tests own detailed feature behavior and contracts. E2E tests own real app wiring, real routes, real app data, real APIs, and axe checks.

Keep E2E focused on integration risk. Duplicate detailed component behavior in E2E only when the risk exists specifically at the real-app boundary.

## Component/Browser Tests

Put feature browser tests under `src/features/<feature>/__tests__/<feature>.browser.test.tsx`.

Build the test file like a readable journey:

- Define mock data, helpers, locators, render helpers, timer helpers, and network helpers near the top.
- Render realistic component composition, using a memory router, query client, MSW, and controlled feature props where needed.
- Prefer passing mock props or data directly over mocking modules when the component API supports it.
- Use fake timers only for timer-owned behavior, and restore them in cleanup.
- Group tests by user-facing behavior: responsiveness, critical paths, states and error handling, edge cases, accessibility, and ARIA snapshots.
- Cover keyboard and focus behavior where it is part of the feature contract.
- Keep ARIA snapshots small, scoped, and intent-focused.

## E2E Tests

Put feature E2E tests under `e2e/<feature>.spec.ts`.

Write these as short real-app journeys:

- Visit real routes and use real app data, real routing, and real API or index behavior.
- Run axe on the relevant closed and open feature surfaces.
- Cover one real navigation path through app-provided data.
- Cover one real happy path through the feature's production integration.
- Add only small app-level smoke checks, such as a global shortcut opening the feature.
- Wait for app hydration before interacting with controls.
- Wait for dialog or transition state to settle before axe assertions when animations affect opacity.

Leave debounce timing, cache reuse, retry behavior, offline behavior, stale state, focus-trap details, responsive trigger variants, and ARIA snapshots in component/browser tests unless the bug risk is only visible in the full app.

## Feature Docs

Feature-specific requirements, acceptance criteria, or test plans may live under `docs/feature-<name>/`.

Keep this document as the generic frontend testing workflow for agents.
