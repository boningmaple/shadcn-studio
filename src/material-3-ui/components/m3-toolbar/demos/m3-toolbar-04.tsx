import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CropIcon,
} from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3ToggleButtonGroup } from "@/material-3-ui/components/m3-button-group/m3-button-group";
import { M3ToggleIconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Toolbar,
  M3ToolbarDivider,
  M3ToolbarGroup,
  M3ToolbarSpacer,
  M3ToolbarTitle,
} from "@/material-3-ui/components/m3-toolbar/m3-toolbar";

export default function M3ToolbarDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-0 overflow-hidden rounded-[20px] border border-[#cac4d0] bg-[#fffbfe] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <M3Toolbar
        aria-label="Image editor toolbar"
        className="border-b border-[#cac4d0] dark:border-[#49454f]"
      >
        <M3ToolbarTitle>Edit image</M3ToolbarTitle>
        <M3ToolbarSpacer />
        <M3ToolbarGroup>
          <M3Button variant="text">Cancel</M3Button>
          <M3Button variant="filled">Apply</M3Button>
        </M3ToolbarGroup>
      </M3Toolbar>
      <div className="grid min-h-64 place-items-center bg-[#f7f2fa] p-6 dark:bg-[#211f26]">
        <div className="h-36 w-56 rounded-[20px] bg-[#e8def8] dark:bg-[#4a4458]" />
      </div>
      <M3Toolbar aria-label="Object toolbar" density="compact">
        <M3ToolbarGroup>
          <M3Button size="xs" variant="tonal">
            <CropIcon />
            Crop
          </M3Button>
        </M3ToolbarGroup>
        <M3ToolbarDivider />
        <M3ToolbarGroup>
          <M3ToggleButtonGroup
            aria-label="Alignment"
            defaultSelectedKeys={["left"]}
            selectionMode="single"
            spacing="compact"
          >
            <M3ToggleIconButton id="left" size="xs" variant="standard">
              <AlignLeftIcon />
            </M3ToggleIconButton>
            <M3ToggleIconButton id="center" size="xs" variant="standard">
              <AlignCenterIcon />
            </M3ToggleIconButton>
            <M3ToggleIconButton id="right" size="xs" variant="standard">
              <AlignRightIcon />
            </M3ToggleIconButton>
          </M3ToggleButtonGroup>
        </M3ToolbarGroup>
      </M3Toolbar>
    </div>
  );
}
