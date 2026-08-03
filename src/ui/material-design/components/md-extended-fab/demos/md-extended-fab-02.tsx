import { PlusIcon, RouteIcon } from "lucide-react";

import { MDExtendedFABButton } from "@/ui/material-design/components/md-extended-fab/md-extended-fab";

export default function MDExtendedFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDExtendedFABButton color="primary">
        <PlusIcon />
        New task
      </MDExtendedFABButton>
      <MDExtendedFABButton color="secondary">Compose</MDExtendedFABButton>
      <MDExtendedFABButton color="tertiary">
        <RouteIcon />
        Reroute
      </MDExtendedFABButton>
    </div>
  );
}
