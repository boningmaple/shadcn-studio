import { ArchiveIcon, CheckIcon, PlusIcon } from "lucide-react";

import { M3ExtendedFABButton } from "@/material-3-ui/components/m3-extended-fab/m3-extended-fab";

export default function M3ExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3ExtendedFABButton color="primary">
        <PlusIcon />
        Enabled
      </M3ExtendedFABButton>
      <M3ExtendedFABButton color="secondary" isDisabled>
        <ArchiveIcon />
        Disabled
      </M3ExtendedFABButton>
      <M3ExtendedFABButton color="tertiary" isPending>
        <CheckIcon />
        Pending
      </M3ExtendedFABButton>
    </div>
  );
}
