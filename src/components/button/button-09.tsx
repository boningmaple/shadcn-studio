import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  );
}
