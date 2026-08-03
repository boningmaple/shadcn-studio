import { SettingsIcon } from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
      <M3IconButton aria-label="Filled settings" variant="filled">
        <SettingsIcon />
      </M3IconButton>
      <M3IconButton aria-label="Tonal settings" variant="tonal">
        <SettingsIcon />
      </M3IconButton>
      <M3IconButton aria-label="Outlined settings" variant="outlined">
        <SettingsIcon />
      </M3IconButton>
      <M3IconButton aria-label="Standard settings" variant="standard">
        <SettingsIcon />
      </M3IconButton>
    </div>
  );
}
