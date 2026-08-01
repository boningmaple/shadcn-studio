import { ArchiveIcon, ForwardIcon, TrashIcon } from "lucide-react";

import { FABMenu, FABMenuItem } from "@/components/fab-menu/fab-menu";

export default function FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <FABMenu color="tertiary" defaultOpen label="Message actions">
        <FABMenuItem icon={<ForwardIcon />}>Forward</FABMenuItem>
        <FABMenuItem icon={<ArchiveIcon />}>Archive</FABMenuItem>
        <FABMenuItem icon={<TrashIcon />} isDisabled>
          Delete
        </FABMenuItem>
      </FABMenu>
    </div>
  );
}
