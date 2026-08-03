import { PlusIcon } from "lucide-react";

import {
  MDIconButton,
  MDToggleIconButton,
} from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDIconButton aria-label="Round add" shape="round">
        <PlusIcon />
      </MDIconButton>
      <MDIconButton aria-label="Square add" shape="square" variant="tonal">
        <PlusIcon />
      </MDIconButton>
      <MDToggleIconButton aria-label="Round selected add" defaultSelected>
        <PlusIcon />
      </MDToggleIconButton>
      <MDToggleIconButton
        aria-label="Square selected add"
        defaultSelected
        shape="square"
        variant="tonal"
      >
        <PlusIcon />
      </MDToggleIconButton>
    </div>
  );
}
