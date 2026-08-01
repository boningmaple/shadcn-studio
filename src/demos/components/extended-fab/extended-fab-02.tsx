import { PlusIcon, RouteIcon } from "lucide-react";

import { ExtendedFABButton } from "@/components/extended-fab/extended-fab";

export default function ExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <ExtendedFABButton color="primary">
        <PlusIcon />
        New task
      </ExtendedFABButton>
      <ExtendedFABButton color="secondary">Compose</ExtendedFABButton>
      <ExtendedFABButton color="tertiary">
        <RouteIcon />
        Reroute
      </ExtendedFABButton>
    </div>
  );
}
