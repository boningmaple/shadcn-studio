"use client";

import { defineChart, barY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
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
  { channel: "Search", subscribers: 420 },
  { channel: "Social", subscribers: 312 },
  { channel: "Email", subscribers: 248 },
  { channel: "Direct", subscribers: 186 },
  { channel: "Referral", subscribers: 118 },
];

const definition = defineChart({
  marks: [barY(data, { x: "channel", y: "subscribers", fill: "var(--chart-1)" })],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.35) },
    y: { scale: scaleLinear().domain([0, 500]), grid: true },
  },
  theme: {
    foreground: "var(--foreground)",
    muted: "var(--muted-foreground)",
    grid: "var(--border)",
    background: "var(--card)",
  },
  tooltip,
});
export default function ChartBar03() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          TanStack Charts
        </p>
        <CardTitle className="text-lg">Acquisition channels</CardTitle>
        <CardDescription>Where new subscribers discovered us.</CardDescription>
        <p className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">1,284 subscribers</p>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Acquisition channels" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Illustrative data for a sample analytics report.
      </CardFooter>
    </Card>
  );
}
