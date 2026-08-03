import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDTooltip,
  MDTooltipTrigger,
} from "@/ui/material-design/components/md-tooltip/md-tooltip";

const placements = [
  { label: "Top", placement: "top" },
  { label: "Right", placement: "right" },
  { label: "Bottom", placement: "bottom" },
  { label: "Left", placement: "left" },
] as const;

export default function MDTooltipDemo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      {placements.map((item) => (
        <MDTooltipTrigger key={item.label}>
          <MDButton variant="outlined">{item.label}</MDButton>
          <MDTooltip placement={item.placement}>
            Appears {item.label.toLowerCase()}
          </MDTooltip>
        </MDTooltipTrigger>
      ))}
    </div>
  );
}
