import { HeartIcon } from "lucide-react";

import { M3ToggleIconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
      <M3ToggleIconButton aria-label="Favorite">
        {({ isSelected }) => (
          <HeartIcon fill={isSelected ? "currentColor" : "none"} />
        )}
      </M3ToggleIconButton>
      <M3ToggleIconButton aria-label="Favorite selected" defaultSelected>
        {({ isSelected }) => (
          <HeartIcon fill={isSelected ? "currentColor" : "none"} />
        )}
      </M3ToggleIconButton>
      <M3ToggleIconButton aria-label="Favorite disabled" isDisabled>
        <HeartIcon />
      </M3ToggleIconButton>
      <M3ToggleIconButton
        aria-label="Favorite hovered"
        className="[&_[data-slot=icon-button-surface]]:before:opacity-[0.08]"
      >
        <HeartIcon />
      </M3ToggleIconButton>
      <M3ToggleIconButton
        aria-label="Favorite focused"
        className="[&_[data-slot=icon-button-surface]]:outline-2 [&_[data-slot=icon-button-surface]]:outline-solid [&_[data-slot=icon-button-surface]]:outline-offset-2 [&_[data-slot=icon-button-surface]]:outline-[#6750a4] dark:[&_[data-slot=icon-button-surface]]:outline-[#d0bcff]"
        defaultSelected
      >
        <HeartIcon fill="currentColor" />
      </M3ToggleIconButton>
      <M3ToggleIconButton
        aria-label="Favorite pressed"
        className="[&_[data-slot=icon-button-surface]]:rounded-[8px] [&_[data-slot=icon-button-surface]]:before:opacity-[0.1]"
        defaultSelected
      >
        <HeartIcon fill="currentColor" />
      </M3ToggleIconButton>
    </div>
  );
}
