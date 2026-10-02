"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
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
  current: { label: "Subscriptions ($k)", color: "var(--chart-1)" },
  previous: { label: "Services ($k)", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartArea02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Revenue mix · USD thousands</CardDescription>
        <CardTitle className="text-lg">Where growth comes from</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">$640k</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="current"
              stackId="revenue"
              type="monotone"
              stroke="var(--color-current)"
              fill="var(--color-current)"
              fillOpacity={0.65}
            />
            <Area
              dataKey="previous"
              stackId="revenue"
              type="monotone"
              stroke="var(--color-previous)"
              fill="var(--color-previous)"
              fillOpacity={0.25}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Subscriptions and services combined in June.
      </CardFooter>
    </Card>
  );
}
