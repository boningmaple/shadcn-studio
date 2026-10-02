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
  current: { label: "This year", color: "var(--chart-1)" },
  previous: { label: "Last year", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartLine02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Subscriber growth · year over year</CardDescription>
        <CardTitle className="text-lg">A stronger first half</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">+35.3%</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="previous"
              type="monotone"
              stroke="var(--color-previous)"
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={2}
            />
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
        June subscribers compared with the same month last year.
      </CardFooter>
    </Card>
  );
}
