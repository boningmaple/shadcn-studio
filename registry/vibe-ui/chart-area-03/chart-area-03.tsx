"use client";

import { defineChart, areaY, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
const data = [
  { month: "Jan", current: 186, previous: 140 },
  { month: "Feb", current: 225, previous: 178 },
  { month: "Mar", current: 208, previous: 190 },
  { month: "Apr", current: 284, previous: 210 },
  { month: "May", current: 312, previous: 245 },
  { month: "Jun", current: 368, previous: 272 },
];

const definition = defineChart({
  marks: [
    areaY(data, {
      x: "month",
      y: (row) => row.current * 100,
      fill: "var(--chart-1)",
      fillOpacity: 0.18,
    }),
    lineY(data, { x: "month", y: (row) => row.current * 100, stroke: "var(--chart-1)" }),
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.4) },
    y: {
      scale: scaleLinear().domain([0, 40000]),
      grid: true,
      axis: { ticks: { format: (value: number) => `$${value / 1000}k` } },
    },
  },
  theme: {
    foreground: "var(--foreground)",
    muted: "var(--muted-foreground)",
    grid: "var(--border)",
    background: "var(--card)",
  },
  tooltip,
});
export default function ChartArea03() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          TanStack Charts
        </p>
        <CardTitle className="text-lg">Monthly revenue</CardTitle>
        <CardDescription>Revenue momentum across the first half of the year.</CardDescription>
        <p className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">$36,800</p>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Monthly revenue" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Illustrative data for a sample analytics report.
      </CardFooter>
    </Card>
  );
}
