import { PlusIcon } from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:gap-6">
      {sizes.map((size) => (
        <M3IconButton aria-label={`${size} add`} key={size} size={size}>
          <PlusIcon />
        </M3IconButton>
      ))}
    </div>
  );
}
