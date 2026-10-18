"use client";

import { defineChart, colorLegend } from "@tanstack/charts";
import { polar, radialArea, radialLine, radialGrid, angleGrid } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { curveLinearClosed } from "d3-shape";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const data = [
  { skill: "Reliability", current: 92, previous: 72 },
  { skill: "Speed", current: 78, previous: 65 },
  { skill: "Usability", current: 88, previous: 74 },
  { skill: "Support", current: 84, previous: 70 },
  { skill: "Value", current: 80, previous: 82 },
  { skill: "Features", current: 90, previous: 68 },
];

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.7,
      scales: {
        angle: { scale: scalePoint<string>().domain(data.map((row) => row.skill)), wrap: true },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides: [
        radialGrid({ values: [25, 50, 75, 100], shape: "polygon" }),
        angleGrid({ labels: true }),
      ],
      marks: [
        radialArea(data, {
          angle: "skill",
          radius: "current",
          z: () => "June",
          curve: curveLinearClosed,
          fillOpacity: 0.25,
        }),
        radialLine(data, {
          angle: "skill",
          radius: "current",
          z: () => "June",
          curve: curveLinearClosed,
          strokeWidth: 2,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: ["June"],
    range: ["var(--chart-1)"],
    legend: colorLegend({ placement: "bottom" }),
  },
  theme: {
    foreground: "var(--foreground)",
    muted: "var(--muted-foreground)",
    grid: "var(--border)",
    background: "var(--card)",
  },
  tooltip: { use: tooltip, items: [{ field: "current", label: "June" }] },
});

export default function ChartRadar01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Customer survey · scores out of 100</CardDescription>
        <CardTitle className="text-lg">Product health</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">85.3 / 100</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Product health" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Average across six dimensions from the June survey.
      </CardFooter>
    </Card>
  );
}
