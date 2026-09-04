---
status: accepted
---

# Registry builder owns generated catalog files

The Registry builder exclusively owns the `components`, `blocks`, and `pages`
route directories beneath `src/routes/_rootLayout`, plus the generated Registry
sidebar module. It deletes and recreates those outputs on every run, accepting
that handwritten files cannot coexist there in exchange for a simpler build
without stale-file reconciliation or overwrite protection.
