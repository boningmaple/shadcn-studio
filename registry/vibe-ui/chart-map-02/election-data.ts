import {
  barX,
  createChartScene,
  defineChart,
  type SceneNode,
  type SceneRect,
} from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";

import snapshot from "./election-results.json";

export type ElectionSource = {
  name: string;
  url: string;
  revisionId: string;
  retrievedAt: string;
  percentageBasis: string;
  attribution: string;
  license: string;
};
export type ElectionCandidate = { id: number; name: string };
export type CandidateVotes = { candidateId: number; votes: number; percent: number };
export type RegionVotes = {
  code: string;
  name: string;
  results: readonly CandidateVotes[];
};
export type ElectionData = {
  source: ElectionSource;
  candidates: readonly ElectionCandidate[];
  regionVotes: readonly RegionVotes[];
};

export const electionData: ElectionData = snapshot;

export type CandidatePalette = {
  candidateId: number;
  primary: string;
  light: string;
  deep: string;
};

// ID 0 is the fallback palette, not a candidate in the election snapshot.
export const palettes: readonly CandidatePalette[] = [
  { candidateId: 0, primary: "#737373", light: "#d4d4d4", deep: "#404040" },
  { candidateId: 1, primary: "#2184d9", light: "#a6cdf5", deep: "#154d83" },
  { candidateId: 2, primary: "#e31837", light: "#f4a4af", deep: "#861225" },
];

export type ResultRow = CandidateVotes & {
  name: string;
  palette: CandidatePalette;
  votesLabel: string;
  percentLabel: string;
  compactVotesLabel: string;
  compactPercentLabel: string;
  reportingBackground: string;
};

export type RegionResult = {
  code: string;
  name: string;
  totalValidVotes: number;
  candidateResults: readonly ResultRow[];
  displayResults: readonly ResultRow[];
  leader: ResultRow | null;
  leadVotes: number;
  leadPercentPoints: number;
  leadColor: string;
  leadLabel: string;
  leadPointsLabel: string;
};

export type NationalChartData = {
  rows: readonly ResultRow[];
  other: ResultRow;
  bars: readonly {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
  }[];
};

export type DerivedElectionData = {
  source: ElectionSource;
  fallbackPalette: CandidatePalette;
  candidatesById: ReadonlyMap<number, ElectionCandidate>;
  resultsByRegionCode: ReadonlyMap<string, RegionResult>;
  nationalResults: RegionResult;
  overseasResults: RegionResult;
  stateResults: readonly RegionResult[];
  nationalChart: NationalChartData;
};

function rectangles(nodes: readonly SceneNode[]): SceneRect[] {
  return nodes.flatMap((node) =>
    node.kind === "group" ? rectangles(node.children) : node.kind === "rect" ? [node] : [],
  );
}
const round = (value: number) => Math.round(value * 1000) / 1000;

function resultRow(
  result: CandidateVotes,
  name: string,
  palette: CandidatePalette,
  numberFormat: Intl.NumberFormat,
): ResultRow {
  return {
    ...result,
    name,
    palette,
    votesLabel: numberFormat.format(result.votes),
    percentLabel: `${result.percent.toFixed(2)}%`,
    compactVotesLabel: `${(result.votes / 1_000_000).toFixed(1)}M`,
    compactPercentLabel: `${result.percent.toFixed(1)}%`,
    reportingBackground: `repeating-linear-gradient(135deg, transparent 0 3px, ${palette.primary}80 3px 5px)`,
  };
}

/**
 * Prepare every election view in one pass. ChartMap02 memoizes this result;
 * hover/focus changes select an existing region instead of rerunning calculations.
 * Numeric candidate IDs, names, vote counts and published shares come from data.
 */
export function deriveElectionData(data: ElectionData): DerivedElectionData {
  // 1. Index candidates/palettes by numeric ID. Grey is a visual fallback only:
  // candidates keep their original IDs even when they have no dedicated colour.
  const candidatesById = new Map(data.candidates.map((candidate) => [candidate.id, candidate]));
  const palettesById = new Map(palettes.map((palette) => [palette.candidateId, palette]));
  const fallbackPalette = palettesById.get(0);
  if (!fallbackPalette) throw new Error("Missing fallback candidate palette");
  const national = data.regionVotes.find((region) => region.code === "BR");
  if (!national) throw new Error("Missing national election results");

  // 2. The national top two define the displayed candidates in every region.
  // Sort copies so deriving views never mutates the bundled source arrays.
  const featuredIds = [...national.results]
    .sort((a, b) => b.votes - a.votes || a.candidateId - b.candidateId)
    .slice(0, 2)
    .map((result) => result.candidateId);
  if (featuredIds.length !== 2) throw new Error("Expected two national leading candidates");
  const featured = new Set(featuredIds);
  const numberFormat = new Intl.NumberFormat("en-US");

  // 3. Enrich and rank every region once. Preserve each published candidate share.
  // Other is calculated from combined votes, not summed rounded percentages.
  const resultsByRegionCode = new Map<string, RegionResult>();
  for (const region of data.regionVotes) {
    const totalValidVotes = region.results.reduce((total, result) => total + result.votes, 0);
    const candidateResults = region.results
      .map((result) => {
        const candidate = candidatesById.get(result.candidateId);
        if (!candidate)
          throw new Error(`Unknown candidate ${result.candidateId} in ${region.code}`);
        return resultRow(
          result,
          candidate.name,
          palettesById.get(result.candidateId) ?? fallbackPalette,
          numberFormat,
        );
      })
      .sort((a, b) => b.votes - a.votes || a.candidateId - b.candidateId);
    const otherVotes = candidateResults
      .filter((result) => !featured.has(result.candidateId))
      .reduce((total, result) => total + result.votes, 0);
    const other = resultRow(
      {
        candidateId: 0,
        votes: otherVotes,
        percent:
          totalValidVotes === 0 ? 0 : Number(((100 * otherVotes) / totalValidVotes).toFixed(2)),
      },
      "Other",
      fallbackPalette,
      numberFormat,
    );
    const first = candidateResults[0];
    const second = candidateResults[1];
    // A tie or zero valid votes has no unique leader and receives a neutral map fill.
    const leader =
      totalValidVotes > 0 && first && (!second || first.votes > second.votes) ? first : null;
    const leadVotes = leader ? leader.votes - (second?.votes ?? 0) : 0;
    const leadPercentPoints = leader
      ? Number((leader.percent - (second?.percent ?? 0)).toFixed(2))
      : 0;
    resultsByRegionCode.set(region.code, {
      code: region.code,
      name: region.name,
      totalValidVotes,
      candidateResults,
      displayResults: [
        ...candidateResults.filter((result) => featured.has(result.candidateId)),
        other,
      ],
      leader,
      leadVotes,
      leadPercentPoints,
      leadColor: (leader?.palette ?? fallbackPalette).deep,
      leadLabel:
        totalValidVotes === 0
          ? "No valid votes"
          : leader
            ? `Lead of ${numberFormat.format(leadVotes)} votes`
            : "Tied result",
      leadPointsLabel: leader
        ? `${leader.name} +${leadPercentPoints.toFixed(2)} pts`
        : "No unique leading candidate",
    });
  }
  const nationalResults = resultsByRegionCode.get("BR")!;
  const overseasResults = resultsByRegionCode.get("EX");
  if (!overseasResults) throw new Error("Missing overseas election results");

  // 4. Prepare the fixed national chart geometry here, rather than inside its
  // renderer. Reverse the national top two to keep the existing red-first order.
  const rows = [...featuredIds]
    .reverse()
    .map((id) => nationalResults.candidateResults.find((result) => result.candidateId === id)!);
  const definition = defineChart({
    marks: [
      barX(rows, {
        key: "candidateId",
        y: "candidateId",
        x: "percent",
        fill: (row) => row.palette.primary,
      }),
    ],
    scales: {
      x: { scale: scaleLinear().domain([0, 75]), axis: false },
      y: {
        scale: scaleBand<number>()
          .domain(rows.map((row) => row.candidateId))
          .paddingInner(0.14),
        axis: false,
      },
    },
    margin: 0,
  });
  const bars = rectangles(createChartScene(definition, { width: 600, height: 96 }).nodes).map(
    (bar) => ({
      key: bar.key,
      x: round(bar.x),
      y: round(bar.y),
      width: round(bar.width),
      height: round(bar.height),
      fill: bar.style?.fill ?? fallbackPalette.primary,
    }),
  );
  return {
    source: data.source,
    fallbackPalette: fallbackPalette,
    candidatesById,
    resultsByRegionCode,
    nationalResults,
    overseasResults,
    stateResults: [...resultsByRegionCode.values()].filter(
      (region) => region.code !== "BR" && region.code !== "EX",
    ),
    nationalChart: { rows, other: nationalResults.displayResults.at(-1)!, bars },
  };
}
