import { PlusIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:gap-6">
      {sizes.map((size) => (
        <IconButton aria-label={`${size} add`} key={size} size={size}>
          <PlusIcon />
        </IconButton>
      ))}
    </div>
  );
}
