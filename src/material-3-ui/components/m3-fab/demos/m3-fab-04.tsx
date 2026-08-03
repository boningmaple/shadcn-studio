import { ArchiveIcon, CheckIcon, PlusIcon } from "lucide-react";

import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";

export default function M3FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3FABButton aria-label="Add" color="primary">
        <PlusIcon />
      </M3FABButton>
      <M3FABButton aria-label="Archive" color="secondary" isDisabled>
        <ArchiveIcon />
      </M3FABButton>
      <M3FABButton aria-label="Saving" color="tertiary" isPending>
        <CheckIcon />
      </M3FABButton>
    </div>
  );
}
