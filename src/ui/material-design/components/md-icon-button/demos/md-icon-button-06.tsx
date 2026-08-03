import { PlusIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:gap-6">
      {sizes.map((size) => (
        <MDIconButton aria-label={`${size} add`} key={size} size={size}>
          <PlusIcon />
        </MDIconButton>
      ))}
    </div>
  );
}
