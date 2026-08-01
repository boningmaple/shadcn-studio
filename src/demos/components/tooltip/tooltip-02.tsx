import { Button } from "@/components/button/button";
import { Tooltip, TooltipTrigger } from "@/components/tooltip/tooltip";

const placements = [
  { label: "Top", placement: "top" },
  { label: "Right", placement: "right" },
  { label: "Bottom", placement: "bottom" },
  { label: "Left", placement: "left" },
] as const;

export default function TooltipDemo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      {placements.map((item) => (
        <TooltipTrigger key={item.label}>
          <Button variant="outlined">{item.label}</Button>
          <Tooltip placement={item.placement}>
            Appears {item.label.toLowerCase()}
          </Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
