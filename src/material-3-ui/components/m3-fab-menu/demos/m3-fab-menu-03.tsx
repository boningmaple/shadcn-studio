import { ArchiveIcon, ForwardIcon, TrashIcon } from "lucide-react";

import {
  M3FABMenu,
  M3FABMenuItem,
} from "@/material-3-ui/components/m3-fab-menu/m3-fab-menu";

export default function M3FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <M3FABMenu color="tertiary" defaultOpen label="Message actions">
        <M3FABMenuItem icon={<ForwardIcon />}>Forward</M3FABMenuItem>
        <M3FABMenuItem icon={<ArchiveIcon />}>Archive</M3FABMenuItem>
        <M3FABMenuItem icon={<TrashIcon />} isDisabled>
          Delete
        </M3FABMenuItem>
      </M3FABMenu>
    </div>
  );
}
