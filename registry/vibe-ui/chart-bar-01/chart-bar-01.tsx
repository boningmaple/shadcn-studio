"use client";

import { defineChart, barY, colorLegend } from "@tanstack/charts";
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
      z: () => "Orders",
      radius: { end: 5 },
      maxThickness: 40,
      fillOpacity: 1,
    }),
  ],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.35) },
    y: { scale: scaleLinear().domain([0, 400]), grid: true },
  },
  color: {
    domain: ["Orders"],
    range: ["var(--chart-1)"],
    legend: colorLegend({ placement: "bottom" }),
  },
  theme: {
    foreground: "var(--foreground)",
    muted: "var(--muted-foreground)",
    grid: "var(--border)",
    background: "var(--card)",
  },
  tooltip: { use: tooltip, items: [{ field: "current", label: "Orders" }] },
});

export default function ChartBar01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Completed orders · first half of 2026</CardDescription>
        <CardTitle className="text-lg">Orders on the rise</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">1,583 orders</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Orders on the rise" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        June was the strongest month of the half.
      </CardFooter>
    </Card>
  );
}
