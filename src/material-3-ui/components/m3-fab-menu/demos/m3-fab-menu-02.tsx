import { MicIcon, PenLineIcon, VideoIcon } from "lucide-react";

import {
  M3FABMenu,
  M3FABMenuItem,
} from "@/material-3-ui/components/m3-fab-menu/m3-fab-menu";

export default function M3FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <M3FABMenu color="secondary" defaultOpen label="Capture" placement="top">
        <M3FABMenuItem icon={<PenLineIcon />}>Note</M3FABMenuItem>
        <M3FABMenuItem icon={<MicIcon />}>Voice memo</M3FABMenuItem>
        <M3FABMenuItem icon={<VideoIcon />}>Video</M3FABMenuItem>
      </M3FABMenu>
    </div>
  );
}
