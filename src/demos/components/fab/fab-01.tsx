import { EditIcon } from "lucide-react";

import { FABButton } from "@/components/fab/fab";

const sizes = ["small", "medium", "large"] as const;

export default function FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5">
      {sizes.map((size) => (
        <div className="grid justify-items-center gap-3" key={size}>
          <FABButton aria-label={`${size} edit action`} size={size}>
            <EditIcon />
          </FABButton>
          <span className="text-xs capitalize text-muted-foreground">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
