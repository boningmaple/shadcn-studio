import { ArchiveIcon, CheckIcon, PlusIcon } from "lucide-react";

import { FABButton } from "@/components/fab/fab";

export default function FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <FABButton aria-label="Add" color="primary">
        <PlusIcon />
      </FABButton>
      <FABButton aria-label="Archive" color="secondary" isDisabled>
        <ArchiveIcon />
      </FABButton>
      <FABButton aria-label="Saving" color="tertiary" isPending>
        <CheckIcon />
      </FABButton>
    </div>
  );
}
