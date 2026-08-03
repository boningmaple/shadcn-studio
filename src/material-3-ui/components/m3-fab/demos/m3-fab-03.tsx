import { MessageCircleIcon, PlusIcon } from "lucide-react";

import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";

export default function M3FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5">
      <div className="grid justify-items-center gap-3">
        <M3FABButton aria-label="Create message" color="primary">
          <MessageCircleIcon />
        </M3FABButton>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="grid justify-items-center gap-3">
        <M3FABButton aria-label="Add item" color="primary" lowered>
          <PlusIcon />
        </M3FABButton>
        <span className="text-xs text-muted-foreground">Lowered</span>
      </div>
    </div>
  );
}
