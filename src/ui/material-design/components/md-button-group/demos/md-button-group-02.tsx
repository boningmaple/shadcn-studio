import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ListIcon,
} from "lucide-react";

import { MDButtonGroup } from "@/ui/material-design/components/md-button-group/md-button-group";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDButtonGroupDemo() {
  return (
    <MDButtonGroup aria-label="Paragraph tools" spacing="compact">
      <MDIconButton aria-label="Align left" variant="tonal">
        <AlignLeftIcon />
      </MDIconButton>
      <MDIconButton aria-label="Align center" variant="tonal">
        <AlignCenterIcon />
      </MDIconButton>
      <MDIconButton aria-label="Align right" variant="tonal">
        <AlignRightIcon />
      </MDIconButton>
      <MDIconButton aria-label="Bulleted list" variant="outlined">
        <ListIcon />
      </MDIconButton>
    </MDButtonGroup>
  );
}
