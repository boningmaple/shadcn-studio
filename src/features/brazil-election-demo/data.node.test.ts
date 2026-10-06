import { geoArea, geoBounds } from "d3-geo";
import { describe, expect, it } from "vite-plus/test";

import { brazil, bubbleRadius, results, stateFeatures } from "./data";

describe("Brazil election demo data", () => {
  it("joins all 27 IBGE regions without duplicate or missing results", () => {
    expect(stateFeatures).toHaveLength(27);
    expect(new Set(results.map((result) => result.id)).size).toBe(27);
    expect(stateFeatures.map((feature) => feature.properties.id).sort()).toEqual(
      results.map((result) => result.id).sort(),
    );
    for (const result of results) {
      expect(result.bluePercent + result.redPercent).toBe(100);
    }
  });

  it("uses Brazil's geographic extent rather than the spherical complement", () => {
    const [[west, south], [east, north]] = geoBounds(brazil);
    expect(west).toBeGreaterThan(-75);
    expect(east).toBeLessThan(-30);
    expect(south).toBeGreaterThan(-35);
    expect(north).toBeLessThan(6);
    expect(geoArea(brazil)).toBeLessThan(1);
  });

  it("makes circle area proportional to the vote lead", () => {
    expect(bubbleRadius(0)).toBe(0);
    expect(bubbleRadius(400000) ** 2 / bubbleRadius(100000) ** 2).toBeCloseTo(4);
  });
});
