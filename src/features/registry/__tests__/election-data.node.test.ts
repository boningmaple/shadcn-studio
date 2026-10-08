import { describe, expect, it } from "vite-plus/test";

import brazil from "@/registry/vibe-ui/chart-map-02/brazil.json";
import {
  deriveElectionData,
  electionData,
  type ElectionData,
} from "@/registry/vibe-ui/chart-map-02/election-data";
import {
  deriveMapData,
  mapLayout,
  type BrazilBoundaries,
} from "@/registry/vibe-ui/chart-map-02/map-model";

// Deliberately unordered results and rounded percentages check numeric joins
// and aggregation from counts rather than from already-rounded source shares.
const fixture: ElectionData = {
  source: electionData.source,
  candidates: [
    { id: 1, name: "Blue" },
    { id: 2, name: "Red" },
    { id: 3, name: "Third" },
  ],
  regionVotes: ["BR", "EX", "AM"].map((code) => ({
    code,
    name: code,
    results: [
      { candidateId: 3, votes: 7, percent: 6.99 },
      { candidateId: 2, votes: 48, percent: 48 },
      { candidateId: 1, votes: 45, percent: 45 },
    ],
  })),
};

describe("Election data flow", () => {
  it("joins numeric IDs and prepares leaders, leads and Other without mutating the source", () => {
    const original = JSON.stringify(fixture);
    const data = deriveElectionData(fixture);
    const region = data.resultsByRegionCode.get("AM")!;
    expect(region.leader?.candidateId).toBe(2);
    expect(region.leadVotes).toBe(3);
    expect(region.leadPercentPoints).toBe(3);
    expect(region.displayResults.map((row) => row.candidateId)).toEqual([2, 1, 0]);
    expect(region.displayResults[2].votes).toBe(7);
    expect(region.displayResults[2].percent).toBe(7);
    expect(region.candidateResults.find((row) => row.candidateId === 3)?.palette.candidateId).toBe(
      0,
    );
    expect(region.candidateResults[0].name).toBe("Red");
    expect(JSON.stringify(fixture)).toBe(original);
  });

  it("returns no unique leader for tied or empty regions", () => {
    for (const votes of [0, 10]) {
      const source = {
        ...fixture,
        regionVotes: fixture.regionVotes.map((region) => ({
          ...region,
          results: region.results.map((row) => ({
            ...row,
            votes,
            percent: votes === 0 ? 0 : 33.33,
          })),
        })),
      };
      const data = deriveElectionData(source);
      expect(data.nationalResults.leader).toBeNull();
      expect(data.nationalResults.leadVotes).toBe(0);
      expect(Number.isFinite(data.nationalResults.displayResults[2].percent)).toBe(true);
    }
  });

  it("reconciles every candidate and the grouped views with the national total", () => {
    const data = deriveElectionData(electionData);
    expect(data.stateResults).toHaveLength(27);
    expect(data.resultsByRegionCode.size).toBe(29);
    for (const candidate of electionData.candidates) {
      const total = [...data.stateResults, data.overseasResults].reduce(
        (sum, region) =>
          sum + region.candidateResults.find((row) => row.candidateId === candidate.id)!.votes,
        0,
      );
      expect(total).toBe(
        data.nationalResults.candidateResults.find((row) => row.candidateId === candidate.id)!
          .votes,
      );
    }
    expect(data.nationalResults.displayResults.reduce((sum, row) => sum + row.votes, 0)).toBe(
      data.nationalResults.totalValidVotes,
    );
  });

  it("joins boundaries by code, produces distinct anchors and shares the palette with legends", () => {
    const election = deriveElectionData(electionData);
    const map = deriveMapData(brazil as BrazilBoundaries, election, mapLayout);
    expect(map.regions).toHaveLength(27);
    expect(new Set(map.regions.map((region) => `${region.x},${region.y}`)).size).toBe(27);
    for (const region of map.regions) {
      expect(region.result).toBe(election.resultsByRegionCode.get(region.code));
      expect(region.path).not.toBe("");
      const leader = region.result.leader!;
      const band = leader.percent < 50 ? 0 : leader.percent <= 60 ? 1 : 2;
      expect(region.fill).toBe(
        map.legends.find((legend) => legend.candidateId === leader.candidateId)!.bands[band].color,
      );
    }
    const altered = { ...election, resultsByRegionCode: new Map(election.resultsByRegionCode) };
    altered.resultsByRegionCode.set("AM", {
      ...election.resultsByRegionCode.get("AM")!,
      leader: null,
    });
    expect(
      deriveMapData(brazil as BrazilBoundaries, altered, mapLayout).regionsByCode.get("AM")!.fill,
    ).toBe(election.fallbackPalette.light);
  });
});
