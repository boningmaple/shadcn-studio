import { ImageIcon, PlusIcon, SendIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Toolbar,
  M3ToolbarGroup,
  M3ToolbarSpacer,
} from "@/material-3-ui/components/m3-toolbar/m3-toolbar";

export default function M3ToolbarDemo() {
  return (
    <M3Toolbar
      aria-label="Bottom compose toolbar"
      className="max-w-2xl overflow-hidden rounded-[28px] bg-[#f7f2fa] dark:bg-[#211f26]"
      elevation="raised"
      shape="floating"
    >
      <M3ToolbarGroup>
        <M3FABButton
          aria-label="Create attachment"
          color="secondary"
          size="small"
        >
          <PlusIcon />
        </M3FABButton>
        <M3IconButton aria-label="Add image" variant="standard">
          <ImageIcon />
        </M3IconButton>
      </M3ToolbarGroup>
      <M3ToolbarSpacer />
      <M3ToolbarGroup>
        <M3Button variant="tonal">Save draft</M3Button>
        <M3Button variant="filled">
          <SendIcon />
          Send
        </M3Button>
      </M3ToolbarGroup>
    </M3Toolbar>
  );
}
