import { PlusIcon } from "lucide-react";

import {
  IconButton,
  ToggleIconButton,
} from "@/components/icon-button/icon-button";

export default function IconButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <IconButton aria-label="Round add" shape="round">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Square add" shape="square" variant="tonal">
        <PlusIcon />
      </IconButton>
      <ToggleIconButton aria-label="Round selected add" defaultSelected>
        <PlusIcon />
      </ToggleIconButton>
      <ToggleIconButton
        aria-label="Square selected add"
        defaultSelected
        shape="square"
        variant="tonal"
      >
        <PlusIcon />
      </ToggleIconButton>
    </div>
  );
}
