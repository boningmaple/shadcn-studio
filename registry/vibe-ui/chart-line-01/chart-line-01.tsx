"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

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

export default function ChartLine01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly active subscribers · Jan–Jun 2026</CardDescription>
        <CardTitle className="text-lg">Subscriber growth</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">
          368 subscribers
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="current"
              type="monotone"
              stroke="var(--color-current)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        A steady climb, with 56 new subscribers in June.
      </CardFooter>
    </Card>
  );
}
