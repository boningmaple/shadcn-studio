"use client";

import { defineChart, areaY, lineY, colorLegend } from "@tanstack/charts";
import { d3Curve } from "@tanstack/charts/d3/shape";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
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
    areaY(data, {
      x: "month",
      y1: 0,
      y: "current",
      z: () => "Subscriptions ($k)",
      fillOpacity: 0.65,
      curve: d3Curve(curveMonotoneX),
    }),
    lineY(data, {
      x: "month",
      y: "current",
      z: () => "Subscriptions ($k)",
      strokeWidth: 2,
      curve: d3Curve(curveMonotoneX),
    }),
    areaY(data, {
      x: "month",
      y1: "current",
      y2: (row) => row.current + row.previous,
      z: () => "Services ($k)",
      fillOpacity: 0.25,
      curve: d3Curve(curveMonotoneX),
    }),
    lineY(data, {
      x: "month",
      y: (row) => row.current + row.previous,
      z: () => "Services ($k)",
      strokeWidth: 2,
      curve: d3Curve(curveMonotoneX),
    }),
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.4) },
    y: { scale: scaleLinear().domain([0, 700]), grid: true },
  },
  color: {
    domain: ["Subscriptions ($k)", "Services ($k)"],
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
      { field: "current", label: "Subscriptions ($k)" },
      { field: "previous", label: "Services ($k)" },
    ],
  },
});

export default function ChartArea02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Revenue mix · USD thousands</CardDescription>
        <CardTitle className="text-lg">Where growth comes from</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">$640k</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Where growth comes from" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Subscriptions and services combined in June.
      </CardFooter>
    </Card>
  );
}
