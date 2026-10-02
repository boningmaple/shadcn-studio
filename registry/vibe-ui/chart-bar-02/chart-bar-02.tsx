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
  current: { label: "Online", color: "var(--chart-1)" },
  previous: { label: "In store", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartBar02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly orders · online and in store</CardDescription>
        <CardTitle className="text-lg">Sales by channel</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">640 orders</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="previous" fill="var(--color-previous)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Online contributed 57.5% of June orders.
      </CardFooter>
    </Card>
  );
}
