import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3Button shape="round">Round</M3Button>
      <M3Button shape="square">Square</M3Button>
    </div>
  );
}
