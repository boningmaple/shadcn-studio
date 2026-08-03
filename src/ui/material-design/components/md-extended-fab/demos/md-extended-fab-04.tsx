import { ArchiveIcon, CheckIcon, PlusIcon } from "lucide-react";

import { MDExtendedFABButton } from "@/ui/material-design/components/md-extended-fab/md-extended-fab";

export default function MDExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDExtendedFABButton color="primary">
        <PlusIcon />
        Enabled
      </MDExtendedFABButton>
      <MDExtendedFABButton color="secondary" isDisabled>
        <ArchiveIcon />
        Disabled
      </MDExtendedFABButton>
      <MDExtendedFABButton color="tertiary" isPending>
        <CheckIcon />
        Pending
      </MDExtendedFABButton>
    </div>
  );
}
