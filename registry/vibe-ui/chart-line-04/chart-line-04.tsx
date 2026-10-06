"use client";
import { defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip } from "@tanstack/charts/tooltip";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
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

function createDefinition(rows: typeof data) {
  return defineChart({
    marks: [
      lineY(rows, {
        x: "month",
        y: "current",
        z: () => "This year",
        stroke: "var(--chart-1)",
        points: true,
      }),
      lineY(rows, {
        x: "month",
        y: "previous",
        z: () => "Last year",
        stroke: "var(--chart-2)",
        points: true,
      }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.4) },
      y: { scale: scaleLinear().domain([0, 400]), grid: true },
    },
    theme: {
      foreground: "var(--foreground)",
      muted: "var(--muted-foreground)",
      grid: "var(--border)",
      background: "var(--card)",
    },
    tooltip,
  });
}
export default function ChartLine04() {
  const [range, setRange] = useState<3 | 6>(6);
  const definition = useMemo(() => createDefinition(data.slice(-range)), [range]);
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          TanStack Charts
        </p>
        <CardTitle className="text-lg">Subscriber growth</CardTitle>
        <CardDescription>Compare this year with last year.</CardDescription>
        <p className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">368 subscribers</p>
      </CardHeader>
      <CardContent>
        <fieldset aria-label="Reporting window" className="mb-4 flex gap-2">
          {([6, 3] as const).map((months) => (
            <Button
              key={months}
              aria-pressed={range === months}
              variant={range === months ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(months)}
            >
              {months} months
            </Button>
          ))}
        </fieldset>
        <Chart ariaLabel="Subscriber growth" definition={definition} height={260} />
        <div className="mt-4 flex justify-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-chart-1" />
            This year
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-chart-2" />
            Last year
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Switch between the full half-year and the latest quarter.
      </CardFooter>
    </Card>
  );
}
