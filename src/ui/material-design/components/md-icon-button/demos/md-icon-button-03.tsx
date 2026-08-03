import { SettingsIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
      <MDIconButton aria-label="Enabled settings">
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton aria-label="Disabled settings" isDisabled>
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton
        aria-label="Hovered settings"
        className="[&_[data-slot=icon-button-surface]]:before:opacity-[0.08]"
      >
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton
        aria-label="Focused settings"
        className="[&_[data-slot=icon-button-surface]]:outline-2 [&_[data-slot=icon-button-surface]]:outline-solid [&_[data-slot=icon-button-surface]]:outline-offset-2 [&_[data-slot=icon-button-surface]]:outline-[#6750a4] dark:[&_[data-slot=icon-button-surface]]:outline-[#d0bcff]"
      >
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton
        aria-label="Pressed settings"
        className="[&_[data-slot=icon-button-surface]]:rounded-[8px] [&_[data-slot=icon-button-surface]]:before:opacity-[0.1]"
      >
        <SettingsIcon />
      </MDIconButton>
    </div>
  );
}
