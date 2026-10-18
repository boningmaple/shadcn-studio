"use client";

import { defineChart, barY, group, colorLegend } from "@tanstack/charts";
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
    barY(
      data.flatMap((row) => [
        { month: row.month, value: row.current, series: "Online" },
        { month: row.month, value: row.previous, series: "In store" },
      ]),
      { x: "month", y: "value", z: "series", layout: group({ padding: 0.12 }), radius: { end: 4 } },
    ),
  ],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.35) },
    y: { scale: scaleLinear().domain([0, 400]), grid: true },
  },
  color: {
    domain: ["Online", "In store"],
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
      { field: "series", label: "Channel" },
      { field: "value", label: "Orders" },
    ],
  },
});

export default function ChartBar02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly orders · online and in store</CardDescription>
        <CardTitle className="text-lg">Sales by channel</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">640 orders</div>
      </CardHeader>
      <CardContent>
        <Chart ariaLabel="Sales by channel" definition={definition} height={260} />
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Online contributed 57.5% of June orders.
      </CardFooter>
    </Card>
  );
}
