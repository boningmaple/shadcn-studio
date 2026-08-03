import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-4">
      <M3Button size="xs">XS</M3Button>
      <M3Button size="sm">SM</M3Button>
      <M3Button size="md">MD</M3Button>
      <M3Button size="lg">LG</M3Button>
      <M3Button size="xl">XL</M3Button>
    </div>
  );
}
