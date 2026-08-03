import { HeartIcon } from "lucide-react";

import { MDToggleIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

const variants = ["filled", "tonal", "outlined", "standard"] as const;

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
      {variants.map((variant, index) => (
        <MDToggleIconButton
          aria-label={`${variant} favorite`}
          defaultSelected={index % 2 === 0}
          key={variant}
          variant={variant}
        >
          {({ isSelected }) => (
            <HeartIcon fill={isSelected ? "currentColor" : "none"} />
          )}
        </MDToggleIconButton>
      ))}
    </div>
  );
}
