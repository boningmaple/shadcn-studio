import { EditIcon } from "lucide-react";

import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";

const sizes = ["small", "medium", "large"] as const;

export default function M3FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5">
      {sizes.map((size) => (
        <div className="grid justify-items-center gap-3" key={size}>
          <M3FABButton aria-label={`${size} edit action`} size={size}>
            <EditIcon />
          </M3FABButton>
          <span className="text-xs capitalize text-muted-foreground">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
