import { MessageCircleIcon, PlusIcon } from "lucide-react";

import { MDFABButton } from "@/ui/material-design/components/md-fab/md-fab";

export default function MDFABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5">
      <div className="grid justify-items-center gap-3">
        <MDFABButton aria-label="Create message" color="primary">
          <MessageCircleIcon />
        </MDFABButton>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="grid justify-items-center gap-3">
        <MDFABButton aria-label="Add item" color="primary" lowered>
          <PlusIcon />
        </MDFABButton>
        <span className="text-xs text-muted-foreground">Lowered</span>
      </div>
    </div>
  );
}
