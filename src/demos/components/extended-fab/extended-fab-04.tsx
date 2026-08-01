import { ArchiveIcon, CheckIcon, PlusIcon } from "lucide-react";

import { ExtendedFABButton } from "@/components/extended-fab/extended-fab";

export default function ExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <ExtendedFABButton color="primary">
        <PlusIcon />
        Enabled
      </ExtendedFABButton>
      <ExtendedFABButton color="secondary" isDisabled>
        <ArchiveIcon />
        Disabled
      </ExtendedFABButton>
      <ExtendedFABButton color="tertiary" isPending>
        <CheckIcon />
        Pending
      </ExtendedFABButton>
    </div>
  );
}
