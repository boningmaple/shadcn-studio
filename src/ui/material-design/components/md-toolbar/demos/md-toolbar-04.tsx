import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CropIcon,
} from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDToggleButtonGroup } from "@/ui/material-design/components/md-button-group/md-button-group";
import { MDToggleIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDToolbar,
  MDToolbarDivider,
  MDToolbarGroup,
  MDToolbarSpacer,
  MDToolbarTitle,
} from "@/ui/material-design/components/md-toolbar/md-toolbar";

export default function MDToolbarDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-0 overflow-hidden rounded-[20px] border border-[#cac4d0] bg-[#fffbfe] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <MDToolbar
        aria-label="Image editor toolbar"
        className="border-b border-[#cac4d0] dark:border-[#49454f]"
      >
        <MDToolbarTitle>Edit image</MDToolbarTitle>
        <MDToolbarSpacer />
        <MDToolbarGroup>
          <MDButton variant="text">Cancel</MDButton>
          <MDButton variant="filled">Apply</MDButton>
        </MDToolbarGroup>
      </MDToolbar>
      <div className="grid min-h-64 place-items-center bg-[#f7f2fa] p-6 dark:bg-[#211f26]">
        <div className="h-36 w-56 rounded-[20px] bg-[#e8def8] dark:bg-[#4a4458]" />
      </div>
      <MDToolbar aria-label="Object toolbar" density="compact">
        <MDToolbarGroup>
          <MDButton size="xs" variant="tonal">
            <CropIcon />
            Crop
          </MDButton>
        </MDToolbarGroup>
        <MDToolbarDivider />
        <MDToolbarGroup>
          <MDToggleButtonGroup
            aria-label="Alignment"
            defaultSelectedKeys={["left"]}
            selectionMode="single"
            spacing="compact"
          >
            <MDToggleIconButton id="left" size="xs" variant="standard">
              <AlignLeftIcon />
            </MDToggleIconButton>
            <MDToggleIconButton id="center" size="xs" variant="standard">
              <AlignCenterIcon />
            </MDToggleIconButton>
            <MDToggleIconButton id="right" size="xs" variant="standard">
              <AlignRightIcon />
            </MDToggleIconButton>
          </MDToggleButtonGroup>
        </MDToolbarGroup>
      </MDToolbar>
    </div>
  );
}
