import { CalendarPlusIcon, FilePlus2Icon, ImagePlusIcon } from "lucide-react";

import {
  MDFABMenu,
  MDFABMenuItem,
} from "@/ui/material-design/components/md-fab-menu/md-fab-menu";

export default function MDFABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <MDFABMenu defaultOpen label="Create">
        <MDFABMenuItem icon={<FilePlus2Icon />}>New document</MDFABMenuItem>
        <MDFABMenuItem icon={<ImagePlusIcon />}>Upload image</MDFABMenuItem>
        <MDFABMenuItem icon={<CalendarPlusIcon />}>Add event</MDFABMenuItem>
      </MDFABMenu>
    </div>
  );
}
