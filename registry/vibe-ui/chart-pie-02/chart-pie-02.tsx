"use client";

import { defineChart, colorLegend } from "@tanstack/charts";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react";
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
  { channel: "organic", visitors: 420 },
  { channel: "direct", visitors: 280 },
  { channel: "referral", visitors: 180 },
  { channel: "social", visitors: 120 },
];
const config = {
  organic: { label: "Organic", color: "var(--chart-1)" },
  direct: { label: "Direct", color: "var(--chart-2)" },
  referral: { label: "Referral", color: "var(--chart-3)" },
  social: { label: "Social", color: "var(--chart-4)" },
};

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.85,
      scales: { angle: null, radius: null },
      marks: [
        radialArc(pie(data, { value: "visitors", gapAngle: Math.PI / 60 }), {
          innerRadius: ({ radius }) => radius * 0.716,
          color: (row) => config[row.channel as keyof typeof config].label,
          key: "channel",
          stroke: "var(--card)",
          strokeWidth: 2,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: Object.values(config).map((item) => item.label),
    range: Object.values(config).map((item) => item.color),
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
      { field: "channel", label: "Channel" },
      { field: "visitors", label: "Visits" },
    ],
  },
});

export default function ChartPie02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Acquisition breakdown · June 2026</CardDescription>
        <CardTitle className="text-lg">How visitors find you</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">1,000 visits</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="How visitors find you" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Organic search accounts for 42% of all visits.
      </CardFooter>
    </Card>
  );
}
