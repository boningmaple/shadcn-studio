"use client";

import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { month: "Jan", current: 186, previous: 140 },
  { month: "Feb", current: 225, previous: 178 },
  { month: "Mar", current: 208, previous: 190 },
  { month: "Apr", current: 284, previous: 210 },
  { month: "May", current: 312, previous: 245 },
  { month: "Jun", current: 368, previous: 272 },
];
const config = {
  current: { label: "This year", color: "var(--chart-1)" },
  previous: { label: "Last year", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartLine03() {
  const [range, setRange] = useState<3 | 6>(6);
  const visibleData = data.slice(-range);
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Choose a reporting window</CardDescription>
        <CardTitle className="text-lg">Explore subscriber growth</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">{`${visibleData.at(-1)?.current} subscribers`}</div>
      </CardHeader>
      <CardContent>
        <fieldset aria-label="Reporting window" className="mb-4 flex gap-2">
          <Button
            aria-pressed={range === 6}
            variant={range === 6 ? "default" : "outline"}
            size="sm"
            onClick={() => setRange(6)}
          >
            6 months
          </Button>
          <Button
            aria-pressed={range === 3}
            variant={range === 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setRange(3)}
          >
            3 months
          </Button>
        </fieldset>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <LineChart accessibilityLayer data={visibleData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="current"
              type="monotone"
              stroke="var(--color-current)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Switch between the full half-year and the latest quarter.
      </CardFooter>
    </Card>
  );
}
