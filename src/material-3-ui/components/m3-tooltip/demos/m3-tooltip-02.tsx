import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3Tooltip,
  M3TooltipTrigger,
} from "@/material-3-ui/components/m3-tooltip/m3-tooltip";

const placements = [
  { label: "Top", placement: "top" },
  { label: "Right", placement: "right" },
  { label: "Bottom", placement: "bottom" },
  { label: "Left", placement: "left" },
] as const;

export default function M3TooltipDemo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      {placements.map((item) => (
        <M3TooltipTrigger key={item.label}>
          <M3Button variant="outlined">{item.label}</M3Button>
          <M3Tooltip placement={item.placement}>
            Appears {item.label.toLowerCase()}
          </M3Tooltip>
        </M3TooltipTrigger>
      ))}
    </div>
  );
}
