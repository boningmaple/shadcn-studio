import { Edit3Icon, SendIcon } from "lucide-react";

import { ExtendedFABButton } from "@/components/extended-fab/extended-fab";

export default function ExtendedFABDemo() {
  return (
    <div className="grid w-full justify-items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ExtendedFABButton color="surface">
          <Edit3Icon />
          Default elevation
        </ExtendedFABButton>
        <ExtendedFABButton color="surface" lowered>
          <SendIcon />
          Lowered
        </ExtendedFABButton>
      </div>
      <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Use lowered elevation when the surrounding layout is already raised.
      </span>
    </div>
  );
}
