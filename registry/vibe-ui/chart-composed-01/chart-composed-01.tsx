"use client";

import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis } from "recharts";

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
  current: { label: "Revenue ($k)", color: "var(--chart-1)" },
  previous: { label: "Target ($k)", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartComposed01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly operating performance · Jan–Jun 2026</CardDescription>
        <CardTitle className="text-lg">Revenue against target</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">$368k</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <ComposedChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="current"
              fill="var(--color-current)"
              fillOpacity={0.7}
              radius={[4, 4, 0, 0]}
              maxBarSize={38}
            />
            <Line
              dataKey="previous"
              type="monotone"
              stroke="var(--color-previous)"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Revenue exceeded the June target by $96k.
      </CardFooter>
    </Card>
  );
}
