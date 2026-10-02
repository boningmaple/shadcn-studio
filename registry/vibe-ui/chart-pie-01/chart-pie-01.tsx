"use client";

import { PieChart, Pie } from "recharts";

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
  { channel: "organic", visitors: 420, fill: "var(--color-organic)" },
  { channel: "direct", visitors: 280, fill: "var(--color-direct)" },
  { channel: "referral", visitors: 180, fill: "var(--color-referral)" },
  { channel: "social", visitors: 120, fill: "var(--color-social)" },
];
const config = {
  organic: { label: "Organic", color: "var(--chart-1)" },
  direct: { label: "Direct", color: "var(--chart-2)" },
  referral: { label: "Referral", color: "var(--chart-3)" },
  social: { label: "Social", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function ChartPie01() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Acquisition breakdown · June 2026</CardDescription>
        <CardTitle className="text-lg">Traffic by channel</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">1,000 visits</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="channel"
              innerRadius={0}
              outerRadius={95}
              paddingAngle={3}
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Organic search accounts for 42% of all visits.
      </CardFooter>
    </Card>
  );
}
