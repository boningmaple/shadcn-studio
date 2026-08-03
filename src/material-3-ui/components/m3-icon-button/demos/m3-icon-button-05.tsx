import { PlusIcon } from "lucide-react";

import {
  M3IconButton,
  M3ToggleIconButton,
} from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3IconButton aria-label="Round add" shape="round">
        <PlusIcon />
      </M3IconButton>
      <M3IconButton aria-label="Square add" shape="square" variant="tonal">
        <PlusIcon />
      </M3IconButton>
      <M3ToggleIconButton aria-label="Round selected add" defaultSelected>
        <PlusIcon />
      </M3ToggleIconButton>
      <M3ToggleIconButton
        aria-label="Square selected add"
        defaultSelected
        shape="square"
        variant="tonal"
      >
        <PlusIcon />
      </M3ToggleIconButton>
    </div>
  );
}
