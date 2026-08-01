import { MessageCircleIcon, PlusIcon } from "lucide-react";

import { FABButton } from "@/components/fab/fab";

export default function FABDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5">
      <div className="grid justify-items-center gap-3">
        <FABButton aria-label="Create message" color="primary">
          <MessageCircleIcon />
        </FABButton>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="grid justify-items-center gap-3">
        <FABButton aria-label="Add item" color="primary" lowered>
          <PlusIcon />
        </FABButton>
        <span className="text-xs text-muted-foreground">Lowered</span>
      </div>
    </div>
  );
}
