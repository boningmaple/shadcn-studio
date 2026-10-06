# Brazil election map demo

Open `/demos/brazil-election` with the local development server running.
This is a standalone learning demo; it is not a Registry item.
All election values and candidate names are simulated.

## Read the code in this order

1. `data.ts`: the 27 result rows, stable IBGE code join, Point features, and square-root radius mapping.
2. `brazil-election-demo.tsx`: one shared fitted Mercator projection for boundaries, bubbles, and labels; a responsive chart definition; focus states and React tooltip content.
3. `data.node.test.ts`: checks for complete joins, correct spherical geometry, and proportional circle areas.

The map uses TanStack Charts 1.0.0. Its `geoShape` mark renders both polygons and
points. The custom label mark emits labels without adding Cartesian scales or
extra interaction points. The state selector offers a separate way to explore
small regions, and chart keyboard navigation supports pinning a tooltip.

The largest bubble has a 45px radius at a 760px chart width, scaling down for
smaller containers. The radius domain remains fixed across state selection.
Positions are approximate authored anchors, not state capitals. Circle sizes
in the legend illustrate area ratios; map pixel radii vary with container width.

## Boundary provenance

`brazil-states.json` was downloaded on 2026-10-06 from the public IBGE mesh API:

https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=UF

The response has 27 features with `codarea` identifiers. Polygon rings were
reversed to match D3's spherical winding convention; coordinates and feature
IDs were preserved. This is a simplified learning map, not a boundary survey.

## Replace the sample results

Keep the stable IBGE identifiers and geographic anchors, and replace the sample
vote data with a verified results dataset. Derive shares and vote leads from
raw candidate counts. For more than two candidates, extend the result model and
tooltip and calculate the lead from the top two candidates. Supply real counting
progress instead of the demo's fixed 100%. Match boundary vintage to the election.

## Learning sources

- [TanStack React quick start](https://tanstack.com/charts/latest/docs/framework/react/quick-start)
- [Maps and spatial charts](https://tanstack.com/charts/latest/docs/examples/maps-and-spatial)
- [Geo Shape mark](https://tanstack.com/charts/latest/docs/reference/marks/geo)
- [Focus and interaction](https://tanstack.com/charts/latest/docs/reference/focus-and-interaction)
- [D3 geographic projections](https://d3js.org/d3-geo/projection)
- [IBGE mesh API](https://servicodados.ibge.gov.br/api/docs/malhas?versao=3)
