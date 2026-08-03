import { SettingsIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
      <MDIconButton aria-label="Filled settings" variant="filled">
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton aria-label="Tonal settings" variant="tonal">
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton aria-label="Outlined settings" variant="outlined">
        <SettingsIcon />
      </MDIconButton>
      <MDIconButton aria-label="Standard settings" variant="standard">
        <SettingsIcon />
      </MDIconButton>
    </div>
  );
}
