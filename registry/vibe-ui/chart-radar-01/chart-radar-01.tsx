"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

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
  { skill: "Reliability", current: 92, previous: 72 },
  { skill: "Speed", current: 78, previous: 65 },
  { skill: "Usability", current: 88, previous: 74 },
  { skill: "Support", current: 84, previous: 70 },
  { skill: "Value", current: 80, previous: 82 },
  { skill: "Features", current: 90, previous: 68 },
];
const config = {
  current: { label: "June", color: "var(--chart-1)" },
  previous: { label: "March", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartRadar01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Customer survey · scores out of 100</CardDescription>
        <CardTitle className="text-lg">Product health</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">85.3 / 100</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <RadarChart accessibilityLayer data={data} outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              dataKey="current"
              stroke="var(--color-current)"
              fill="var(--color-current)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Average across six dimensions from the June survey.
      </CardFooter>
    </Card>
  );
}
