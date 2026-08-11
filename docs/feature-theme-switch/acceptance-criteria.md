# Theme Switch Acceptance Criteria

| Field              | Value                                |
| ------------------ | ------------------------------------ |
| Status             | Approved                             |
| Feature identifier | `feature-theme-switch`               |
| Document type      | Acceptance Criteria                  |
| Source Requirement | [`requirement.md`](./requirement.md) |
| Requirement status | Approved                             |
| Last updated       | 2026-08-11                           |

## Purpose

This document translates the approved Theme Switch Requirement into observable
Acceptance Criteria (AC). Each criterion defines a product outcome that can be
judged as pass or fail without prescribing the implementation or the test
layer used to verify it.

The future Test Plan will map these criteria to automated and manual Test
Cases. Passing implementation-specific tests is not sufficient when the
observable outcome in this document is not met.

## Definitions

- **Selected theme**: The user's preference: `system`, `light`, or `dark`.
- **Resolved appearance**: The visual appearance currently rendered by the
  app: `light` or `dark`.
- **OS**: Operating System.
- **Initial paint**: The first visible rendering of the app document during a
  page load.
- **Hydrated**: The point at which the client application can process the
  theme control's interactions correctly.
- **Supported browser**: The Chromium version installed and used by the
  project's automated test environment.
- **Same-origin browsing context**: A browser tab or window using the same
  origin and browser profile as another open instance of the app.
- **Root theme state**: The theme information exposed on the root HTML
  (HyperText Markup Language) element for global CSS (Cascading Style Sheets)
  and nested UI (User Interface) consumers.

## Theme Preference and Control

### `AC-TS-001`: Exactly three selected themes

**Maps to:** `REQ-TS-001`

- **Given** the theme feature is available,
- **When** a user repeatedly activates the theme switch,
- **Then** the selected theme can be only `system`, `light`, or `dark`,
- **And** no fourth theme value can be selected through the control.

### `AC-TS-002`: Default selected theme

**Maps to:** `REQ-TS-002`

- **Given** the browser has no stored theme preference,
- **When** the user loads the app,
- **Then** the selected theme is `system`,
- **And** the resolved appearance matches the current OS appearance.

### `AC-TS-003`: Header control availability

**Maps to:** `REQ-TS-003`

- **Given** a page displays the app header,
- **When** the page is ready for interaction,
- **Then** the header contains an operable theme switch,
- **And** activating it changes the selected theme.

### `AC-TS-004`: Theme cycle order

**Maps to:** `REQ-TS-004`

The following transitions must occur on one activation of the theme switch:

| Current selected theme | Next selected theme |
| ---------------------- | ------------------- |
| `system`               | `light`             |
| `light`                | `dark`              |
| `dark`                 | `system`            |

After three consecutive activations, the selected theme must return to its
starting value.

## Persistence and Synchronization

### `AC-TS-005`: Preference survives reloads and later visits

**Maps to:** `REQ-TS-005`

- **Given** a user selects any supported theme,
- **When** the user reloads the page or returns in a later browsing session
  using the same browser profile,
- **Then** the app restores that selected theme before the user interacts with
  the switch.

### `AC-TS-006`: Invalid or unavailable preference recovery

**Maps to:** `REQ-TS-006`

For each of the following conditions:

- no stored value,
- an unsupported value,
- a corrupted value,
- a storage read that throws an exception,

the app must continue loading without an uncaught theme-related error, use
`system` as the selected theme, and resolve the appearance from the OS.

When storage is writable, an invalid stored value must be replaced with the
valid default value. When storage is not writable, the app must remain usable
without requiring the write to succeed.

### `AC-TS-007`: Same-origin synchronization

**Maps to:** `REQ-TS-017`

- **Given** two same-origin browsing contexts are open,
- **And** both have completed hydration,
- **When** the selected theme changes in either context,
- **Then** the other context updates to the same selected theme without a
  reload,
- **And** each context renders the correct resolved appearance for that
  selected theme.

The behavior must work in both directions between the two contexts.

### `AC-TS-008`: Stored data minimization

**Maps to:** `REQ-TS-018`

- **Given** the user changes the selected theme,
- **When** theme-related browser storage is inspected,
- **Then** the feature stores only one of `system`, `light`, or `dark`,
- **And** it does not store an identity, account identifier, browsing history,
  timestamp, or other personal data.

## Appearance Resolution and Startup

### `AC-TS-009`: Root theme state

**Maps to:** `REQ-TS-007`

- **Given** the app has resolved the current theme,
- **When** the root HTML element is inspected,
- **Then** it exposes the selected theme for theme-aware consumers,
- **And** it exposes whether the resolved appearance is `light` or `dark`,
- **And** the browser color scheme matches the resolved appearance.

The three observable values must describe the same theme state after any
theme-related event has settled.

### `AC-TS-010`: Explicit light appearance

**Maps to:** `REQ-TS-008`

- **Given** the selected theme is `light`,
- **When** the OS appearance is light or dark,
- **Then** the resolved appearance remains `light`.

### `AC-TS-011`: Explicit dark appearance

**Maps to:** `REQ-TS-009`

- **Given** the selected theme is `dark`,
- **When** the OS appearance is light or dark,
- **Then** the resolved appearance remains `dark`.

### `AC-TS-012`: System appearance resolution

**Maps to:** `REQ-TS-010`

- **Given** the selected theme is `system`,
- **When** the OS appearance is light,
- **Then** the resolved appearance is `light`.

- **Given** the selected theme is `system`,
- **When** the OS appearance is dark,
- **Then** the resolved appearance is `dark`.

### `AC-TS-013`: Live OS appearance changes

**Maps to:** `REQ-TS-011`

- **Given** the selected theme is `system`,
- **When** the OS appearance changes between light and dark,
- **Then** the resolved appearance updates to match without a page reload,
- **And** the selected theme remains `system`.

- **Given** the selected theme is explicitly `light` or `dark`,
- **When** the OS appearance changes,
- **Then** neither the selected theme nor the resolved appearance changes.

### `AC-TS-014`: Correct initial paint

**Maps to:** `REQ-TS-012`

For each selected theme and each applicable OS appearance:

- **Given** enough browser information is available before initial paint,
- **When** the page is loaded or reloaded,
- **Then** the initial paint uses the correct resolved appearance,
- **And** no visible frame uses the opposite appearance first.

If browser storage cannot be read, the initial paint must use the documented
`system` fallback instead of preventing the page from rendering.

### `AC-TS-015`: Interaction readiness

**Maps to:** `REQ-TS-013`

- **Given** the server-rendered page is visible but the client application has
  not completed the hydration needed by the theme switch,
- **When** the switch is inspected or an activation is attempted,
- **Then** the switch is non-interactive,
- **And** the selected theme does not change.

- **Given** the required hydration has completed,
- **Then** the same control becomes interactive without requiring a reload.

## Accessibility and Interaction

### `AC-TS-016`: Accessible name

**Maps to:** `REQ-TS-014`

For each supported selected theme:

- **Given** the theme switch is exposed to assistive technology,
- **When** its accessible name is read,
- **Then** the name communicates the current selected theme,
- **And** it communicates the selected theme that the next activation will
  choose,
- **And** only the label for the current state contributes to the accessible
  name.

The accessible name must update after each successful activation.

### `AC-TS-017`: Pointer and keyboard operation

**Maps to:** `REQ-TS-015`

- **Given** the hydrated switch is activated with a supported pointer input,
- **Then** it performs exactly one transition in the documented cycle.

- **Given** keyboard focus is on the hydrated switch,
- **When** the user presses Enter or Space,
- **Then** it performs exactly one transition in the documented cycle.

The control must not require pointer input to complete any supported theme
transition.

### `AC-TS-018`: Focus and tooltip continuity

**Maps to:** `REQ-TS-016`

- **Given** keyboard focus is on the switch,
- **When** the user activates it,
- **Then** focus remains on the theme switch,
- **And** subsequent keyboard activation remains possible.

- **Given** a tooltip is shown for the switch,
- **When** the selected theme changes,
- **Then** any visible tooltip describes the new current theme and next action,
  rather than the previous state.

- **Given** activation comes from touch or virtual input,
- **Then** the feature does not require or force a tooltip interaction to
  communicate the result.

The tooltip must not be the only source of information required to understand
or operate the control.

## Quality Attributes

### `AC-TS-019`: Hydration consistency

**Maps to:** `NFR-TS-001`

For no stored value and for each supported stored theme:

- **Given** the page is server-rendered and then hydrated,
- **When** hydration completes,
- **Then** the theme control represents the same initial state before and after
  hydration,
- **And** the browser reports no theme-related hydration mismatch,
- **And** no stale accessible name remains after hydration.

### `AC-TS-020`: Startup performance

**Maps to:** `NFR-TS-002`

- **Given** the page loads in the supported browser,
- **When** the initial theme is determined and applied,
- **Then** the correct theme is available for initial paint,
- **And** no visible frame uses the opposite appearance first,
- **And** it introduces no theme-specific network request on the startup path.

### `AC-TS-021`: Safe storage failure

**Maps to:** `NFR-TS-003`

For storage read and storage write failures:

- **Given** the browser storage operation throws an exception,
- **When** the page loads or the user changes the selected theme,
- **Then** the app remains rendered and operable,
- **And** no uncaught theme-related exception reaches the user,
- **And** the current browsing context continues using a valid selected theme
  and resolved appearance.

Persistence is not required to succeed while storage remains unavailable.

### `AC-TS-022`: Existing design system consistency

**Maps to:** `NFR-TS-004`

- **Given** the switch is compared with existing app-header controls,
- **Then** its visual structure, interaction states, focus indication, and
  tooltip behavior use the app's established design system conventions.

- **Given** the resolved appearance changes,
- **Then** app surfaces that use global theme tokens update consistently
  without feature-specific color overrides being required.

### `AC-TS-023`: No theme network dependency

**Maps to:** `NFR-TS-005`

- **Given** the app assets required for the current page are already available,
- **When** the selected theme is read, changed, persisted, or resolved,
- **Then** no network request is required for the theme operation to complete,
- **And** the operation remains functional while the browser is offline.

## Traceability Matrix

| Source Requirement | Acceptance Criteria |
| ------------------ | ------------------- |
| `REQ-TS-001`       | `AC-TS-001`         |
| `REQ-TS-002`       | `AC-TS-002`         |
| `REQ-TS-003`       | `AC-TS-003`         |
| `REQ-TS-004`       | `AC-TS-004`         |
| `REQ-TS-005`       | `AC-TS-005`         |
| `REQ-TS-006`       | `AC-TS-006`         |
| `REQ-TS-007`       | `AC-TS-009`         |
| `REQ-TS-008`       | `AC-TS-010`         |
| `REQ-TS-009`       | `AC-TS-011`         |
| `REQ-TS-010`       | `AC-TS-012`         |
| `REQ-TS-011`       | `AC-TS-013`         |
| `REQ-TS-012`       | `AC-TS-014`         |
| `REQ-TS-013`       | `AC-TS-015`         |
| `REQ-TS-014`       | `AC-TS-016`         |
| `REQ-TS-015`       | `AC-TS-017`         |
| `REQ-TS-016`       | `AC-TS-018`         |
| `REQ-TS-017`       | `AC-TS-007`         |
| `REQ-TS-018`       | `AC-TS-008`         |
| `NFR-TS-001`       | `AC-TS-019`         |
| `NFR-TS-002`       | `AC-TS-020`         |
| `NFR-TS-003`       | `AC-TS-021`         |
| `NFR-TS-004`       | `AC-TS-022`         |
| `NFR-TS-005`       | `AC-TS-023`         |

## Acceptance Gate

The feature is eligible for Product Acceptance when:

1. Every criterion in this document has a corresponding Test Case or
   documented Review method in the approved Test Plan.
2. Every required automated check passes against the Release Candidate.
3. Every required manual check has recorded evidence and a reviewer.
4. No criterion is failed, skipped, or waived without an approved exception
   that records its owner, reason, user impact, and follow-up action.
5. Product Acceptance is performed against an integrated Preview or Staging
   environment rather than an isolated implementation artifact.

Production deployment and post-deployment verification are separate Release
Gates and do not replace Product Acceptance.
