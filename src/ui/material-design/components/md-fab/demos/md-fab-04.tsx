import { ArchiveIcon, CheckIcon, PlusIcon } from "lucide-react";

import { MDFABButton } from "@/ui/material-design/components/md-fab/md-fab";

export default function MDFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDFABButton aria-label="Add" color="primary">
        <PlusIcon />
      </MDFABButton>
      <MDFABButton aria-label="Archive" color="secondary" isDisabled>
        <ArchiveIcon />
      </MDFABButton>
      <MDFABButton aria-label="Saving" color="tertiary" isPending>
        <CheckIcon />
      </MDFABButton>
    </div>
  );
}
