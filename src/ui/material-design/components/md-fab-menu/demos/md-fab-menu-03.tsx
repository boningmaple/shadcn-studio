import { ArchiveIcon, ForwardIcon, TrashIcon } from "lucide-react";

import {
  MDFABMenu,
  MDFABMenuItem,
} from "@/ui/material-design/components/md-fab-menu/md-fab-menu";

export default function MDFABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <MDFABMenu color="tertiary" defaultOpen label="Message actions">
        <MDFABMenuItem icon={<ForwardIcon />}>Forward</MDFABMenuItem>
        <MDFABMenuItem icon={<ArchiveIcon />}>Archive</MDFABMenuItem>
        <MDFABMenuItem icon={<TrashIcon />} isDisabled>
          Delete
        </MDFABMenuItem>
      </MDFABMenu>
    </div>
  );
}
