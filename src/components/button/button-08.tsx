import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <Button shape="round">Round</Button>
      <Button shape="square">Square</Button>
    </div>
  );
}
