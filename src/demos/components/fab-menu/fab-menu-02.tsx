import { MicIcon, PenLineIcon, VideoIcon } from "lucide-react";

import { FABMenu, FABMenuItem } from "@/components/fab-menu/fab-menu";

export default function FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <FABMenu color="secondary" defaultOpen label="Capture" placement="top">
        <FABMenuItem icon={<PenLineIcon />}>Note</FABMenuItem>
        <FABMenuItem icon={<MicIcon />}>Voice memo</FABMenuItem>
        <FABMenuItem icon={<VideoIcon />}>Video</FABMenuItem>
      </FABMenu>
    </div>
  );
}
