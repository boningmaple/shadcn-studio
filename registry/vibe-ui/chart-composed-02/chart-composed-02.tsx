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
  { month: "Jan", current: 186, previous: 220 },
  { month: "Feb", current: 225, previous: 250 },
  { month: "Mar", current: 208, previous: 250 },
  { month: "Apr", current: 284, previous: 300 },
  { month: "May", current: 312, previous: 350 },
  { month: "Jun", current: 368, previous: 400 },
];

const definition = defineChart({
  marks: [
    barY(data, {
      x: "month",
      y: "current",
      z: () => "Orders",
      radius: { end: 4 },
      maxThickness: 38,
      fillOpacity: 0.7,
    }),
    lineY(data, {
      x: "month",
      y: "previous",
      z: () => "Capacity",
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
    domain: ["Orders", "Capacity"],
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
      { field: "current", label: "Orders" },
      { field: "previous", label: "Capacity" },
    ],
  },
});

export default function ChartComposed02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly operating performance · Jan–Jun 2026</CardDescription>
        <CardTitle className="text-lg">Demand and capacity</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">
          92% utilization
        </div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Demand and capacity" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        368 orders fulfilled against a June capacity of 400.
      </CardFooter>
    </Card>
  );
}
