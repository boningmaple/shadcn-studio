import { HeartIcon } from "lucide-react";

import { MDToggleIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
      <MDToggleIconButton aria-label="Favorite">
        {({ isSelected }) => (
          <HeartIcon fill={isSelected ? "currentColor" : "none"} />
        )}
      </MDToggleIconButton>
      <MDToggleIconButton aria-label="Favorite selected" defaultSelected>
        {({ isSelected }) => (
          <HeartIcon fill={isSelected ? "currentColor" : "none"} />
        )}
      </MDToggleIconButton>
      <MDToggleIconButton aria-label="Favorite disabled" isDisabled>
        <HeartIcon />
      </MDToggleIconButton>
      <MDToggleIconButton
        aria-label="Favorite hovered"
        className="[&_[data-slot=icon-button-surface]]:before:opacity-[0.08]"
      >
        <HeartIcon />
      </MDToggleIconButton>
      <MDToggleIconButton
        aria-label="Favorite focused"
        className="[&_[data-slot=icon-button-surface]]:outline-2 [&_[data-slot=icon-button-surface]]:outline-solid [&_[data-slot=icon-button-surface]]:outline-offset-2 [&_[data-slot=icon-button-surface]]:outline-[#6750a4] dark:[&_[data-slot=icon-button-surface]]:outline-[#d0bcff]"
        defaultSelected
      >
        <HeartIcon fill="currentColor" />
      </MDToggleIconButton>
      <MDToggleIconButton
        aria-label="Favorite pressed"
        className="[&_[data-slot=icon-button-surface]]:rounded-[8px] [&_[data-slot=icon-button-surface]]:before:opacity-[0.1]"
        defaultSelected
      >
        <HeartIcon fill="currentColor" />
      </MDToggleIconButton>
    </div>
  );
}
