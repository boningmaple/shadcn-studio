import { HeartIcon } from "lucide-react";

import { M3ToggleIconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

const variants = ["filled", "tonal", "outlined", "standard"] as const;

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
      {variants.map((variant, index) => (
        <M3ToggleIconButton
          aria-label={`${variant} favorite`}
          defaultSelected={index % 2 === 0}
          key={variant}
          variant={variant}
        >
          {({ isSelected }) => (
            <HeartIcon fill={isSelected ? "currentColor" : "none"} />
          )}
        </M3ToggleIconButton>
      ))}
    </div>
  );
}
