import { MicIcon, PenLineIcon, VideoIcon } from "lucide-react";

import {
  MDFABMenu,
  MDFABMenuItem,
} from "@/ui/material-design/components/md-fab-menu/md-fab-menu";

export default function MDFABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <MDFABMenu color="secondary" defaultOpen label="Capture" placement="top">
        <MDFABMenuItem icon={<PenLineIcon />}>Note</MDFABMenuItem>
        <MDFABMenuItem icon={<MicIcon />}>Voice memo</MDFABMenuItem>
        <MDFABMenuItem icon={<VideoIcon />}>Video</MDFABMenuItem>
      </MDFABMenu>
    </div>
  );
}
