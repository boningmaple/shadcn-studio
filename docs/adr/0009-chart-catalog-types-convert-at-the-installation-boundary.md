---
status: superseded by ADR-0010
---

# Charts are a catalog type with a compatible installation export

The initial chart implementation authored `registry:chart` and converted it to
`registry:component` for shadcn installation. ADR-0010 replaces that distinction
with ordered categories and removes the conversion.
