import { Edit3Icon, SendIcon } from "lucide-react";

import { M3ExtendedFABButton } from "@/material-3-ui/components/m3-extended-fab/m3-extended-fab";

export default function M3ExtendedFABDemo() {
  return (
    <div className="grid w-full justify-items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <M3ExtendedFABButton color="surface">
          <Edit3Icon />
          Default elevation
        </M3ExtendedFABButton>
        <M3ExtendedFABButton color="surface" lowered>
          <SendIcon />
          Lowered
        </M3ExtendedFABButton>
      </div>
      <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Use lowered elevation when the surrounding layout is already raised.
      </span>
    </div>
  );
}
