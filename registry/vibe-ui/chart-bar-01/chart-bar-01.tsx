"use client";

import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

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
const config = { current: { label: "Orders", color: "var(--chart-1)" } } satisfies ChartConfig;

export default function ChartBar01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Completed orders · first half of 2026</CardDescription>
        <CardTitle className="text-lg">Orders on the rise</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">1,583 orders</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="current"
              fill="var(--color-current)"
              radius={[5, 5, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        June was the strongest month of the half.
      </CardFooter>
    </Card>
  );
}
