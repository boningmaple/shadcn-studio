import { ImageIcon, PlusIcon, SendIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDFABButton } from "@/ui/material-design/components/md-fab/md-fab";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDToolbar,
  MDToolbarGroup,
  MDToolbarSpacer,
} from "@/ui/material-design/components/md-toolbar/md-toolbar";

export default function MDToolbarDemo() {
  return (
    <MDToolbar
      aria-label="Bottom compose toolbar"
      className="max-w-2xl overflow-hidden rounded-[28px] bg-[#f7f2fa] dark:bg-[#211f26]"
      elevation="raised"
      shape="floating"
    >
      <MDToolbarGroup>
        <MDFABButton
          aria-label="Create attachment"
          color="secondary"
          size="small"
        >
          <PlusIcon />
        </MDFABButton>
        <MDIconButton aria-label="Add image" variant="standard">
          <ImageIcon />
        </MDIconButton>
      </MDToolbarGroup>
      <MDToolbarSpacer />
      <MDToolbarGroup>
        <MDButton variant="tonal">Save draft</MDButton>
        <MDButton variant="filled">
          <SendIcon />
          Send
        </MDButton>
      </MDToolbarGroup>
    </MDToolbar>
  );
}
