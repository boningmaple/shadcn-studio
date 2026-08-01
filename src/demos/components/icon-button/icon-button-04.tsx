import { HeartIcon } from "lucide-react";

import { ToggleIconButton } from "@/components/icon-button/icon-button";

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
      <ToggleIconButton aria-label="Favorite">
        {({ isSelected }) => (
          <HeartIcon fill={isSelected ? "currentColor" : "none"} />
        )}
      </ToggleIconButton>
      <ToggleIconButton aria-label="Favorite selected" defaultSelected>
        {({ isSelected }) => (
          <HeartIcon fill={isSelected ? "currentColor" : "none"} />
        )}
      </ToggleIconButton>
      <ToggleIconButton aria-label="Favorite disabled" isDisabled>
        <HeartIcon />
      </ToggleIconButton>
      <ToggleIconButton
        aria-label="Favorite hovered"
        className="[&_[data-slot=icon-button-surface]]:before:opacity-[0.08]"
      >
        <HeartIcon />
      </ToggleIconButton>
      <ToggleIconButton
        aria-label="Favorite focused"
        className="[&_[data-slot=icon-button-surface]]:outline-2 [&_[data-slot=icon-button-surface]]:outline-solid [&_[data-slot=icon-button-surface]]:outline-offset-2 [&_[data-slot=icon-button-surface]]:outline-[#6750a4] dark:[&_[data-slot=icon-button-surface]]:outline-[#d0bcff]"
        defaultSelected
      >
        <HeartIcon fill="currentColor" />
      </ToggleIconButton>
      <ToggleIconButton
        aria-label="Favorite pressed"
        className="[&_[data-slot=icon-button-surface]]:rounded-[8px] [&_[data-slot=icon-button-surface]]:before:opacity-[0.1]"
        defaultSelected
      >
        <HeartIcon fill="currentColor" />
      </ToggleIconButton>
    </div>
  );
}
