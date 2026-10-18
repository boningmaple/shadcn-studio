"use client";

import { defineChart, barY, lineY, colorLegend } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { Chart } from "@tanstack/charts/react";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { curveMonotoneX } from "d3-shape";

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
    barY(data, {
      x: "month",
      y: "current",
      z: () => "Revenue ($k)",
      radius: { end: 4 },
      maxThickness: 38,
      fillOpacity: 0.7,
    }),
    lineY(data, {
      x: "month",
      y: "previous",
      z: () => "Target ($k)",
      strokeWidth: 3,
      points: true,
      curve: d3Curve(curveMonotoneX),
    }),
  ],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.35) },
    y: { scale: scaleLinear().domain([0, 400]), grid: true },
  },
  color: {
    domain: ["Revenue ($k)", "Target ($k)"],
    range: ["var(--chart-1)", "var(--chart-2)"],
    legend: colorLegend({ placement: "bottom" }),
  },
  theme: {
    foreground: "var(--foreground)",
    muted: "var(--muted-foreground)",
    grid: "var(--border)",
    background: "var(--card)",
  },
  tooltip: {
    use: tooltip,
    items: [
      { field: "current", label: "Revenue ($k)" },
      { field: "previous", label: "Target ($k)" },
    ],
  },
});

export default function ChartComposed01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly operating performance · Jan–Jun 2026</CardDescription>
        <CardTitle className="text-lg">Revenue against target</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">$368k</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Revenue against target" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Revenue exceeded the June target by $96k.
      </CardFooter>
    </Card>
  );
}
