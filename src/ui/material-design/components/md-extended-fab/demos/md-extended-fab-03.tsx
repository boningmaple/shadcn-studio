import { Edit3Icon, SendIcon } from "lucide-react";

import { MDExtendedFABButton } from "@/ui/material-design/components/md-extended-fab/md-extended-fab";

export default function MDExtendedFABDemo() {
  return (
    <div className="grid w-full justify-items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MDExtendedFABButton color="surface">
          <Edit3Icon />
          Default elevation
        </MDExtendedFABButton>
        <MDExtendedFABButton color="surface" lowered>
          <SendIcon />
          Lowered
        </MDExtendedFABButton>
      </div>
      <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Use lowered elevation when the surrounding layout is already raised.
      </span>
    </div>
  );
}
