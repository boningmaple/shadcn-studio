"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

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
  { team: "platform", progress: 86, fill: "var(--color-platform)" },
  { team: "design", progress: 72, fill: "var(--color-design)" },
  { team: "product", progress: 64, fill: "var(--color-product)" },
];
const config = {
  platform: { label: "Platform", color: "var(--chart-1)" },
  design: { label: "Design", color: "var(--chart-2)" },
  product: { label: "Product", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function ChartRadial02() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardDescription>Delivery progress · Q2 2026</CardDescription>
        <CardTitle className="text-lg">Team goal progress</CardTitle>
        <div className="pt-2 text-3xl font-semibold tracking-tight tabular-nums">Three teams</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
          <RadialBarChart
            accessibilityLayer
            data={data}
            innerRadius="35%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="progress" background cornerRadius={8} />
            <ChartTooltip content={<ChartTooltipContent nameKey="team" />} />
            <ChartLegend content={<ChartLegendContent nameKey="team" />} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        Completion against each team’s quarterly target.
      </CardFooter>
    </Card>
  );
}
