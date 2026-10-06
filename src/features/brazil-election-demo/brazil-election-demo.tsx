import { createMark, defineChart } from "@tanstack/charts";
import type { ChartBounds, ChartPoint, SceneLabel } from "@tanstack/charts";
import { geoShape } from "@tanstack/charts/geo";
import { Chart } from "@tanstack/charts/react/tooltip";
import { tooltip } from "@tanstack/charts/tooltip";
import { geoMercator } from "d3-geo";
import { useMemo, useState } from "react";

import {
  brazil,
  bubbleFeatures,
  bubbleRadius,
  colors,
  numberFormat,
  results,
  stateFeatures,
  type StateResult,
} from "./data";

function fittedProjection(chart: ChartBounds) {
  return geoMercator().fitExtent(
    [
      [chart.x + 14, chart.y + 14],
      [chart.x + chart.width - 14, chart.y + chart.height - 14],
    ],
    brazil,
  );
}

type ResultCardProps = { result: StateResult; compact?: boolean };

function ResultCard(props: ResultCardProps) {
  const candidates = [
    { name: "Candidate A", percent: props.result.bluePercent, color: colors.blue },
    { name: "Candidate B", percent: props.result.redPercent, color: colors.red },
  ].sort((a, b) => b.percent - a.percent);
  return (
    <div className={props.compact ? "min-w-56 p-2 text-stone-800" : "text-stone-800"}>
      <p className="text-xs font-medium tracking-[0.14em] text-stone-500 uppercase">
        {props.result.code} · State result
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{props.result.name}</h2>
      <p style={{ color: colors[props.result.leader] }} className="mt-3 text-sm font-semibold">
        Lead of {numberFormat.format(props.result.leadVotes)} votes
      </p>
      <p className="mt-1 text-xs text-stone-500">
        {props.result.leader === "blue" ? "Candidate A" : "Candidate B"} +
        {props.result.leadPoints.toFixed(1)} percentage points
      </p>
      <div className="mt-5 space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.name}>
            <div className="flex items-center justify-between gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span style={{ background: candidate.color }} className="size-2.5 rounded-full" />
                {candidate.name}
              </span>
              <strong className="tabular-nums">{candidate.percent.toFixed(1)}%</strong>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
              <div
                style={{ width: `${candidate.percent}%`, background: candidate.color }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-stone-100 pt-4 text-xs text-stone-500">
        100% counted · {numberFormat.format(props.result.validVotes)} valid votes
      </p>
      <p className="mt-2 text-[11px] text-stone-400">Simulated results for demonstration.</p>
    </div>
  );
}

export function BrazilElectionDemo() {
  const [selectedId, setSelectedId] = useState("51");
  const selected = results.find((result) => result.id === selectedId) ?? results[0];
  const definition = useMemo(
    () =>
      defineChart({
        chart: ({ width }) => ({
          marks: [
            geoShape(stateFeatures, {
              id: "states",
              projection: ({ chart }) => fittedProjection(chart),
              key: (feature) => feature.properties.id,
              fill: (feature) => (feature.properties.id === selectedId ? "#e2e1df" : "#f0efed"),
              stroke: "#ffffff",
              strokeWidth: 1.2,
            }),
            geoShape(bubbleFeatures, {
              id: "vote-leads",
              projection: ({ chart }) => fittedProjection(chart),
              key: (feature) => feature.properties.id,
              r: (feature) => feature.properties.leadVotes,
              rScale: (lead) => bubbleRadius(lead) * Math.min(1, width / 760),
              fill: (feature) => colors[feature.properties.leader],
              fillOpacity: 0.28,
              stroke: (feature) =>
                feature.properties.id === selectedId
                  ? "#292524"
                  : colors[feature.properties.leader],
              strokeWidth: 1.5,
              states: [
                { when: { focus: "primary" }, style: { stroke: "#292524", strokeWidth: 3 } },
              ],
            }),
            createMark<(typeof stateFeatures)[number], never, never>(() => ({
              id: "state-labels",
              channels: {},
              render: ({ chart }) => {
                const projection = fittedProjection(chart);
                const labelCodes =
                  chart.width < 500
                    ? ["AM", "PA", "MT", "BA", "MG", "SP", "RS"]
                    : [
                        "AM",
                        "RR",
                        "AP",
                        "PA",
                        "AC",
                        "RO",
                        "MT",
                        "TO",
                        "MA",
                        "PI",
                        "CE",
                        "BA",
                        "GO",
                        "MS",
                        "MG",
                        "ES",
                        "RJ",
                        "SP",
                        "PR",
                        "SC",
                        "RS",
                      ];
                const nodes: SceneLabel[] = results
                  .filter((result) => labelCodes.includes(result.code))
                  .flatMap((result) => {
                    const position = projection(result.coordinates);
                    if (!position) return [];
                    return [
                      {
                        kind: "label",
                        key: `label-${result.id}`,
                        x: position[0],
                        y:
                          position[1] +
                          bubbleRadius(result.leadVotes) * Math.min(1, width / 760) +
                          11,
                        text: result.code,
                        anchor: "middle",
                        fontSize: chart.width < 500 ? 10 : 11,
                        fontWeight: 500,
                        fill: "#57534e",
                      },
                    ];
                  });
                return { nodes };
              },
            })),
          ],
          scales: { x: null, y: null },
          margin: 12,
        }),
        focusRing: false,
        tooltip: {
          use: tooltip,
          className: "brazil-results-tooltip",
          format: (
            point: ChartPoint<
              (typeof stateFeatures)[number] | (typeof bubbleFeatures)[number],
              number,
              number
            >,
          ) => point.datum.properties.name,
        },
      }),
    [selectedId],
  );

  const totalVotes = results.reduce((total, result) => total + result.validVotes, 0);
  const blueVotes = results.reduce(
    (total, result) => total + (result.validVotes * result.bluePercent) / 100,
    0,
  );
  const blueShare = (blueVotes / totalVotes) * 100;

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-8 text-stone-900 sm:px-10 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="border-t-2 border-stone-900 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase">
            <span>Election atlas / Brazil</span>
            <span className="rounded-full bg-amber-100 px-3 py-1.5 tracking-wide text-amber-900">
              Simulated data · Demo
            </span>
          </div>
          <h1 className="mt-6 font-serif text-4xl tracking-tight sm:text-6xl">
            Every state. Every vote.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600">
            Explore a presidential runoff across Brazil. Colour shows the leading candidate; circle
            area shows their lead in votes.
          </p>
        </header>
        <div className="mt-7 grid grid-cols-2 gap-6 border-y border-stone-200 py-5 sm:gap-12">
          {[
            { name: "Candidate A", share: blueShare, color: colors.blue },
            { name: "Candidate B", share: 100 - blueShare, color: colors.red },
          ].map((candidate) => (
            <div key={candidate.name}>
              <div className="flex items-center gap-2 text-sm">
                <span style={{ background: candidate.color }} className="size-2.5 rounded-full" />
                {candidate.name}
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
                {candidate.share.toFixed(1)}
                <span className="text-lg text-stone-400">%</span>
              </p>
              <div
                style={{ background: candidate.color, width: `${candidate.share}%` }}
                className="mt-3 h-1"
              />
            </div>
          ))}
        </div>
        <section
          aria-label="Interactive election results"
          className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]"
        >
          <div className="rounded-xl border border-stone-200 bg-white p-2 sm:p-4">
            <Chart
              ariaLabel="Brazil simulated election results. Use arrow keys to explore states and Enter to pin a result."
              definition={definition}
              aspectRatio={1.03}
              initialWidth={760}
              className="w-full"
              renderTooltipBody={({ primaryPoint, pinned, dismiss }) =>
                primaryPoint ? (
                  <div>
                    <ResultCard result={primaryPoint.datum.properties} compact />
                    {pinned ? (
                      <button
                        type="button"
                        className="mt-2 w-full border-t border-stone-200 py-2 text-xs text-stone-600"
                        onClick={dismiss}
                      >
                        Close result
                      </button>
                    ) : null}
                  </div>
                ) : null
              }
              onSelect={(point) => {
                if (point) setSelectedId(point.datum.properties.id);
              }}
            />
            <p className="px-3 pb-2 text-center text-[11px] text-stone-500">
              Hover to explore · Tap or click to pin · Arrow keys to navigate
            </p>
          </div>
          <aside className="rounded-xl border border-stone-200 bg-white p-5">
            <label htmlFor="demo-state" className="text-xs font-medium text-stone-500">
              Explore a state
            </label>
            <select
              id="demo-state"
              value={selectedId}
              className="mt-2 mb-6 h-10 w-full rounded-md border border-stone-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              onChange={(event) => setSelectedId(event.target.value)}
            >
              {[...results]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((result) => (
                  <option key={result.id} value={result.id}>
                    {result.name}
                  </option>
                ))}
            </select>
            <div aria-live="polite" aria-atomic="true">
              <ResultCard result={selected} />
            </div>
            <div className="mt-7 border-t border-stone-200 pt-5">
              <h3 className="text-xs font-semibold">How to read the map</h3>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                A circle with twice the area represents twice the vote lead. Positions are
                approximate state anchors.
              </p>
              <svg
                aria-label="Circle size legend: 100,000, 500,000 and 2 million votes"
                viewBox="0 0 230 80"
                className="mt-3 w-full"
              >
                {[100000, 500000, 2000000].map((value, index) => (
                  <g key={value}>
                    <circle
                      cx={35 + index * 80}
                      cy={35}
                      r={bubbleRadius(value)}
                      fill="#f0efed"
                      stroke="#a8a29e"
                    />
                    <text
                      x={35 + index * 80}
                      y={73}
                      textAnchor="middle"
                      fontSize={10}
                      fill="#78716c"
                    >
                      {value === 2000000 ? "2m" : `${value / 1000}k`}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </aside>
        </section>
        <footer className="mt-7 flex flex-wrap justify-between gap-3 border-t border-stone-200 pt-4 text-[11px] leading-5 text-stone-500">
          <p>
            Built with TanStack Charts · Results are illustrative, not a forecast or official count.
          </p>
          <a
            href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3"
            className="underline underline-offset-4"
          >
            Boundaries: IBGE / minimum-quality UF mesh
          </a>
        </footer>
      </div>
    </main>
  );
}
