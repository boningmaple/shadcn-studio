import { SettingsIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
      <IconButton aria-label="Enabled settings">
        <SettingsIcon />
      </IconButton>
      <IconButton aria-label="Disabled settings" isDisabled>
        <SettingsIcon />
      </IconButton>
      <IconButton
        aria-label="Hovered settings"
        className="[&_[data-slot=icon-button-surface]]:before:opacity-[0.08]"
      >
        <SettingsIcon />
      </IconButton>
      <IconButton
        aria-label="Focused settings"
        className="[&_[data-slot=icon-button-surface]]:outline-2 [&_[data-slot=icon-button-surface]]:outline-solid [&_[data-slot=icon-button-surface]]:outline-offset-2 [&_[data-slot=icon-button-surface]]:outline-[#6750a4] dark:[&_[data-slot=icon-button-surface]]:outline-[#d0bcff]"
      >
        <SettingsIcon />
      </IconButton>
      <IconButton
        aria-label="Pressed settings"
        className="[&_[data-slot=icon-button-surface]]:rounded-[8px] [&_[data-slot=icon-button-surface]]:before:opacity-[0.1]"
      >
        <SettingsIcon />
      </IconButton>
    </div>
  );
}
