import { ImageIcon, PlusIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import { FABButton } from "@/components/fab/fab";
import { IconButton } from "@/components/icon-button/icon-button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from "@/components/toolbar/toolbar";

export default function ToolbarDemo() {
  return (
    <Toolbar
      aria-label="Bottom compose toolbar"
      className="max-w-2xl overflow-hidden rounded-[28px] bg-[#f7f2fa] dark:bg-[#211f26]"
      elevation="raised"
      shape="floating"
    >
      <ToolbarGroup>
        <FABButton
          aria-label="Create attachment"
          color="secondary"
          size="small"
        >
          <PlusIcon />
        </FABButton>
        <IconButton aria-label="Add image" variant="standard">
          <ImageIcon />
        </IconButton>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button variant="tonal">Save draft</Button>
        <Button variant="filled">
          <SendIcon />
          Send
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
