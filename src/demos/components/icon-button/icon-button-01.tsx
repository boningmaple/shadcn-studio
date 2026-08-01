import { SettingsIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
      <IconButton aria-label="Filled settings" variant="filled">
        <SettingsIcon />
      </IconButton>
      <IconButton aria-label="Tonal settings" variant="tonal">
        <SettingsIcon />
      </IconButton>
      <IconButton aria-label="Outlined settings" variant="outlined">
        <SettingsIcon />
      </IconButton>
      <IconButton aria-label="Standard settings" variant="standard">
        <SettingsIcon />
      </IconButton>
    </div>
  );
}
