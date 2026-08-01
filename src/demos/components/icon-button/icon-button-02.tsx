import { HeartIcon } from "lucide-react";

import { ToggleIconButton } from "@/components/icon-button/icon-button";

const variants = ["filled", "tonal", "outlined", "standard"] as const;

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
      {variants.map((variant, index) => (
        <ToggleIconButton
          aria-label={`${variant} favorite`}
          defaultSelected={index % 2 === 0}
          key={variant}
          variant={variant}
        >
          {({ isSelected }) => (
            <HeartIcon fill={isSelected ? "currentColor" : "none"} />
          )}
        </ToggleIconButton>
      ))}
    </div>
  );
}
