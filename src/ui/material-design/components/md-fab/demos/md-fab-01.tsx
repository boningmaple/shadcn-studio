import { EditIcon } from "lucide-react";

import { MDFABButton } from "@/ui/material-design/components/md-fab/md-fab";

const sizes = ["small", "medium", "large"] as const;

export default function MDFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5">
      {sizes.map((size) => (
        <div className="grid justify-items-center gap-3" key={size}>
          <MDFABButton aria-label={`${size} edit action`} size={size}>
            <EditIcon />
          </MDFABButton>
          <span className="text-xs capitalize text-muted-foreground">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
