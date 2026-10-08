"use client";

import { useCallback, useId, useMemo, useState } from "react";

import brazil from "./brazil.json";
import { deriveElectionData, electionData } from "./election-data";
import { ElectionLegend } from "./election-legend";
import { ElectionMap } from "./election-map";
import { boundarySource, deriveMapData, mapLayout, type BrazilBoundaries } from "./map-model";
import { NationalResultsChart } from "./national-results-chart";

export default function ChartMap02() {
  // Only source/layout changes rebuild these views. Hover and selection reuse
  // the memoized lookup maps, bar geometry and geographic scene.
  const election = useMemo(() => deriveElectionData(electionData), []);
  const map = useMemo(
    () => deriveMapData(brazil as BrazilBoundaries, election, mapLayout),
    [election],
  );
  const [hoveredRegionCode, setHoveredRegionCode] = useState<string | null>(null);
  const [activeRegionCode, setActiveRegionCode] = useState<string | null>(null);
  const cardId = useId();
  const shownCode = activeRegionCode ?? hoveredRegionCode;
  const shownRegion = shownCode ? (map.regionsByCode.get(shownCode) ?? null) : null;
  const activeRegion = activeRegionCode ? (map.regionsByCode.get(activeRegionCode) ?? null) : null;
  const activate = useCallback((code: string) => {
    setActiveRegionCode(code);
    setHoveredRegionCode(null);
  }, []);
  const clear = useCallback(() => {
    setActiveRegionCode(null);
    setHoveredRegionCode(null);
  }, []);

  return (
    <section className="w-full">
      <header>
        <h2 className="text-center text-2xl font-semibold sm:text-4xl">Brazil Election 2026</h2>
      </header>
      <NationalResultsChart data={election.nationalChart} />
      <div className="relative">
        <ElectionMap
          data={map}
          shownRegion={shownRegion}
          activeRegion={activeRegion}
          cardId={cardId}
          onPreview={setHoveredRegionCode}
          onActivate={activate}
          onClear={clear}
        />
        <div className="space-y-4 lg:absolute lg:bottom-[20%] lg:left-[8%] lg:max-w-80">
          {map.legends.map((legend) => (
            <ElectionLegend key={legend.candidateId} data={legend} />
          ))}
          <p className="text-xs leading-relaxed text-muted-foreground">
            Colour shows the leading candidate. Darker shades show a higher share of valid votes.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">Overseas voting:</strong>{" "}
            {election.overseasResults.displayResults.map((row, index) => (
              <span key={row.candidateId}>
                {index > 0 && "; "}
                {row.name} {row.percentLabel} ({row.votesLabel} votes)
              </span>
            ))}
            .
          </p>
        </div>
      </div>
      <footer className="mt-4 border-t py-4 text-xs leading-relaxed text-muted-foreground">
        <p>
          Results:{" "}
          <a
            href={election.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {election.source.attribution}
          </a>{" "}
          · Boundaries:{" "}
          <a
            href={boundarySource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {boundarySource.name}
          </a>
        </p>
        <p>
          Election snapshot retrieved {election.source.retrievedAt}; boundaries retrieved{" "}
          {boundarySource.retrievedAt}. Election data licensed{" "}
          <a
            href={election.source.license}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            CC BY-SA 4.0
          </a>
          .
        </p>
      </footer>
    </section>
  );
}
