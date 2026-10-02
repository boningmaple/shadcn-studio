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
} satisfies ChartConfig;

export default function ChartArea01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Monthly revenue · USD thousands</CardDescription>
        <CardTitle className="text-lg">Revenue momentum</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">$368k</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="current"
              type="natural"
              stroke="var(--color-current)"
              fill="var(--color-current)"
              fillOpacity={0.16}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        June revenue is up 17.9% over May.
      </CardFooter>
    </Card>
  );
}
