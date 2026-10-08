import { createChartScene, defineChart, type SceneArea, type SceneNode } from "@tanstack/charts";
import { geoShape } from "@tanstack/charts/geo";
import { geoMercator } from "d3-geo";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

import type { DerivedElectionData, RegionResult } from "./election-data";

export type BrazilBoundaries = FeatureCollection<
  Polygon | MultiPolygon,
  { code: string; name: string }
>;
export type MapLayout = { width: number; height: number; inset: number };
export type MapRegion = {
  code: string;
  name: string;
  result: RegionResult;
  path: string;
  fill: string;
  x: number;
  y: number;
  label: readonly [number, number];
  calloutPath: string | null;
  accessibleLabel: string;
};
export type MapLegend = {
  candidateId: number;
  name: string;
  bands: readonly { label: string; color: string }[];
};
export type DerivedMapData = {
  layout: MapLayout;
  regions: readonly MapRegion[];
  regionsByCode: ReadonlyMap<string, MapRegion>;
  legends: readonly MapLegend[];
};
export const mapLayout: MapLayout = { width: 800, height: 820, inset: 65 };
export const boundarySource = {
  name: "IBGE",
  url: "https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=UF",
  retrievedAt: "2026-10-07",
};
const bands = [
  { label: "Below 50%", shade: "light", maximum: 50, inclusive: false },
  { label: "50–60%", shade: "primary", maximum: 60, inclusive: true },
  { label: "Above 60%", shade: "deep", maximum: Infinity, inclusive: true },
] as const;
// These editorial positions are defined in the default viewBox, not geographic
// facts. Scale the offsets with a different layout while retaining the centroid.
const callouts: Record<string, readonly [number, number]> = {
  AC: [65, 355],
  DF: [570, 450],
  ES: [728, 510],
  RJ: [700, 590],
  RN: [734, 230],
  PB: [752, 280],
  PE: [744, 330],
  AL: [722, 378],
  SE: [693, 423],
};
function sceneAreas(nodes: readonly SceneNode[]): SceneArea[] {
  return nodes.flatMap((node) =>
    node.kind === "group" ? sceneAreas(node.children) : node.kind === "area" ? [node] : [],
  );
}
const round = (value: number) => Math.round(value * 1000) / 1000;

/** Join election results to boundaries and prepare all map geometry and legends.
 * The parent memoizes this independently of hovered/active region codes. */
export function deriveMapData(
  brazil: BrazilBoundaries,
  election: DerivedElectionData,
  layout: MapLayout,
): DerivedMapData {
  // 1. Validate the geographic join by stable region code, never by array order.
  const fillsByCode = new Map<string, string>();
  for (const feature of brazil.features) {
    const result = election.resultsByRegionCode.get(feature.properties.code);
    if (!result) throw new Error(`Missing election result for ${feature.properties.code}`);
    const leader = result.leader;
    const band = leader
      ? bands.find((entry) =>
          entry.inclusive ? leader.percent <= entry.maximum : leader.percent < entry.maximum,
        )
      : null;
    const shade = band?.shade ?? "light";
    fillsByCode.set(result.code, leader ? leader.palette[shade] : election.fallbackPalette.light);
  }
  // 2. TanStack owns fitted projection/path generation. Every state shares the
  // same fit geometry so shapes, anchors and borders stay aligned.
  const definition = defineChart({
    marks: [
      geoShape(brazil.features, {
        key: (feature) => feature.properties.code,
        projection: { type: geoMercator, fit: brazil, inset: layout.inset },
        fill: (feature) => fillsByCode.get(feature.properties.code)!,
        stroke: "#ffffff",
        strokeWidth: 1,
      }),
    ],
    scales: { x: null, y: null },
    margin: 0,
  });
  const scene = createChartScene(definition, layout);
  const areasByKey = new Map(sceneAreas(scene.nodes).map((area) => [area.key, area]));
  // 3. Quantize coordinates for identical Node/browser SVG markup. Build label
  // callouts once, leaving the renderer to draw prepared paths and positions.
  const regions = scene.points
    .map((point): MapRegion => {
      const code = point.datum.properties.code;
      const result = election.resultsByRegionCode.get(code)!;
      const path = areasByKey.get(point.key)?.path;
      if (!path) throw new Error(`Missing projected boundary for ${code}`);
      const x = round(point.x),
        y = round(point.y);
      const callout = callouts[code];
      const label: readonly [number, number] = callout
        ? [
            round((callout[0] * layout.width) / mapLayout.width),
            round((callout[1] * layout.height) / mapLayout.height),
          ]
        : [x, y];
      return {
        code,
        name: result.name,
        result,
        path,
        fill: fillsByCode.get(code)!,
        x,
        y,
        label,
        calloutPath: callout ? `M${x},${y}H${label[0]}V${round(label[1] - 10)}` : null,
        accessibleLabel: result.leader
          ? `${result.name}: ${result.leader.name} leads with ${result.leader.percentLabel}`
          : `${result.name}: ${result.leadLabel}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  // 4. Legends use exactly the same palette fields and thresholds as the fills.
  const legends = [...election.nationalChart.rows].reverse().map((row): MapLegend => ({
    candidateId: row.candidateId,
    name: row.name,
    bands: bands.map((band) => ({ label: band.label, color: row.palette[band.shade] })),
  }));
  return {
    layout,
    regions,
    regionsByCode: new Map(regions.map((region) => [region.code, region])),
    legends,
  };
}
