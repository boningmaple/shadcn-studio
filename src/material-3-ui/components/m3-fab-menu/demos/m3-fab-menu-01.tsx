import { CalendarPlusIcon, FilePlus2Icon, ImagePlusIcon } from "lucide-react";

import {
  M3FABMenu,
  M3FABMenuItem,
} from "@/material-3-ui/components/m3-fab-menu/m3-fab-menu";

export default function M3FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <M3FABMenu defaultOpen label="Create">
        <M3FABMenuItem icon={<FilePlus2Icon />}>New document</M3FABMenuItem>
        <M3FABMenuItem icon={<ImagePlusIcon />}>Upload image</M3FABMenuItem>
        <M3FABMenuItem icon={<CalendarPlusIcon />}>Add event</M3FABMenuItem>
      </M3FABMenu>
    </div>
  );
}
