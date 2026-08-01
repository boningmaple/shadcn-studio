import { CalendarPlusIcon, FilePlus2Icon, ImagePlusIcon } from "lucide-react";

import { FABMenu, FABMenuItem } from "@/components/fab-menu/fab-menu";

export default function FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <FABMenu defaultOpen label="Create">
        <FABMenuItem icon={<FilePlus2Icon />}>New document</FABMenuItem>
        <FABMenuItem icon={<ImagePlusIcon />}>Upload image</FABMenuItem>
        <FABMenuItem icon={<CalendarPlusIcon />}>Add event</FABMenuItem>
      </FABMenu>
    </div>
  );
}
