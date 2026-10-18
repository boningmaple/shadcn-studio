"use client";

import { defineChart, colorLegend } from "@tanstack/charts";
import { polar, radialBarAngle } from "@tanstack/charts/polar";
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

const data = [{ team: "platform", progress: 78 }];
const config = {
  platform: { label: "Platform", color: "var(--chart-1)" },
  design: { label: "Design", color: "var(--chart-2)" },
  product: { label: "Product", color: "var(--chart-3)" },
};

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.9,
      scales: {
        angle: { scale: scaleLinear().domain([0, 100]) },
        radius: {
          scale: scaleBand<string>()
            .domain(data.map((row) => row.team))
            .padding(0.2),
          range: [({ radius }) => radius * 0.35, ({ radius }) => radius],
        },
      },
      marks: [
        radialBarAngle(data, {
          radius: "team",
          angle: () => 100,
          fill: "var(--muted)",
          cornerRadius: "full",
        }),
        radialBarAngle(data, {
          radius: "team",
          angle: "progress",
          color: (row) => config[row.team as keyof typeof config].label,
          key: "team",
          cornerRadius: "full",
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: data.map((row) => config[row.team as keyof typeof config].label),
    range: data.map((row) => config[row.team as keyof typeof config].color),
    legend: colorLegend({
      placement: "bottom",
    }),
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
      { field: "team", label: "Team" },
      { field: "progress", label: "Progress (%)" },
    ],
  },
});

export default function ChartRadial01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Delivery progress · Q2 2026</CardDescription>
        <CardTitle className="text-lg">Quarterly goal</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">78%</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Quarterly goal" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        78 of 100 planned releases shipped this quarter.
      </CardFooter>
    </Card>
  );
}
