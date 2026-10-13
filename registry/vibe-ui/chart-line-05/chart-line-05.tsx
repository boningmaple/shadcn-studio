import { defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";

// NSW FuelCheck comparison table, retrieved 9 October 2026 (cents per litre).
// https://www.fuelcheck.nsw.gov.au/app/FuelPrice/Trend?fuelTypeCode=P95
// The final month is a partial-month average.
const prices = [
  { month: "October 2025", E10: 178.1, P95: 196.7, P98: 203.5, DL: 185.4 },
  { month: "November 2025", E10: 178.6, P95: 196.9, P98: 204.0, DL: 189.6 },
  { month: "December 2025", E10: 179.5, P95: 197.6, P98: 204.8, DL: 190.6 },
  { month: "January 2026", E10: 171.8, P95: 190.9, P98: 198.1, DL: 185.1 },
  { month: "February 2026", E10: 168.1, P95: 187.1, P98: 194.9, DL: 182.8 },
  { month: "March 2026", E10: 222.5, P95: 241.0, P98: 248.7, DL: 256.0 },
  { month: "April 2026", E10: 204.1, P95: 225.5, P98: 233.2, DL: 285.8 },
  { month: "May 2026", E10: 181.4, P95: 202.0, P98: 209.7, DL: 232.3 },
  { month: "June 2026", E10: 164.6, P95: 185.3, P98: 193.5, DL: 199.8 },
  { month: "July 2026", E10: 174.0, P95: 194.3, P98: 202.1, DL: 207.7 },
  { month: "August 2026", E10: 200.1, P95: 220.3, P98: 228.2, DL: 249.0 },
  { month: "September 2026", E10: 221.7, P95: 241.3, P98: 249.5, DL: 271.3 },
  { month: "October 2026", E10: 236.9, P95: 256.9, P98: 264.9, DL: 285.3 },
];

const fuels = [
  { tag: "E10", color: "#3b82f6" },
  { tag: "P95", color: "#8b5cf6" },
  { tag: "P98", color: "#10b981" },
  { tag: "DL", color: "#f97316" },
] as const;

const chart = defineChart({
  focusRing: {
    radius: 5,
    fill: "var(--card)",
    strokeWidth: 2,
  },
  color: { domain: fuels.map((fuel) => fuel.tag), range: fuels.map((fuel) => fuel.color) },
  theme: {
    foreground: "var(--foreground)",
    muted: "var(--muted-foreground)",
    grid: "var(--border)",
    background: "var(--card)",
  },
  marks: fuels.map((fuel) =>
    lineY(
      prices.map((row) => ({ ...row })),
      {
        x: "month",
        y: fuel.tag,
        key: (row) => `${fuel.tag}-${row.month}`,
        color: () => fuel.tag,
        points: true,
        states: [
          {
            when: (context) => !context.matches("series"),
            style: { opacity: 0.3 },
          },
        ],
      },
    ),
  ),
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.5),
      axis: {
        label: "Month",
        line: true,
        ticks: { size: 0, padding: 12, format: (value) => value.slice(0, 3) },
        tickLabels: { thin: false, fontSize: 12 },
      },
    },
    y: {
      scale: scaleLinear().domain([150, 300]),
      grid: { strokeOpacity: 0.7, strokeDasharray: "4 4" },
      axis: {
        label: "Price (cents per litre)",
        line: false,
        ticks: {
          values: [150, 175, 200, 225, 250, 275, 300],
          size: 0,
          format: (value) => value.toFixed(1),
        },
      },
    },
  },
  tooltip: {
    use: tooltip,
    content: (points, context) => {
      const point = context.primaryPoint ?? points[0];
      const row = prices.find((price) => price.month === point?.xValue);
      return {
        title: row?.month,
        rows: row
          ? fuels.map((fuel) => ({
              label: fuel.tag,
              value: `${row[fuel.tag].toFixed(1)} c/L`,
              color: fuel.color,
              active: point?.group === fuel.tag,
            }))
          : [],
      };
    },
  },
});

export default function ChartLine05() {
  return (
    <section
      aria-label="NSW road fuel prices"
      className="w-full rounded-xl border bg-card p-4 text-card-foreground sm:p-6"
    >
      <header className="mb-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <h2 className="text-center text-xl font-semibold sm:col-start-2">
          NSW Road Fuel Prices 2025–2026
        </h2>
        <ul
          aria-label="Fuel price legend"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 rounded-lg border p-3 text-sm sm:justify-self-end"
        >
          {fuels.map((fuel) => (
            <li key={fuel.tag} className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                width="24"
                height="12"
                viewBox="0 0 24 12"
                style={{ color: fuel.color }}
              >
                <path d="M0 6h24" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="6" r="4" fill="currentColor" />
              </svg>
              {fuel.tag}
            </li>
          ))}
        </ul>
      </header>
      <Chart
        ariaLabel="Monthly average NSW fuel prices for E10, P95, P98 and diesel"
        ariaDescription="Monthly averages in cents per litre from October 2025 through October 2026. Use arrow keys to explore prices. October 2026 is a partial month."
        definition={chart}
        height={420}
        className="[&_svg:focus:not(:focus-visible)]:outline-none"
      />
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Source:{" "}
        <a
          href="https://www.fuelcheck.nsw.gov.au/app/FuelPrice/Trend?fuelTypeCode=P95"
          className="underline underline-offset-4 hover:text-foreground"
        >
          NSW FuelCheck
        </a>{" "}
        · Snapshot: 9 October 2026. October 2026 is a partial month. DL = diesel.
      </p>
    </section>
  );
}
