import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ListIcon,
} from "lucide-react";

import { M3ButtonGroup } from "@/material-3-ui/components/m3-button-group/m3-button-group";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3ButtonGroupDemo() {
  return (
    <M3ButtonGroup aria-label="Paragraph tools" spacing="compact">
      <M3IconButton aria-label="Align left" variant="tonal">
        <AlignLeftIcon />
      </M3IconButton>
      <M3IconButton aria-label="Align center" variant="tonal">
        <AlignCenterIcon />
      </M3IconButton>
      <M3IconButton aria-label="Align right" variant="tonal">
        <AlignRightIcon />
      </M3IconButton>
      <M3IconButton aria-label="Bulleted list" variant="outlined">
        <ListIcon />
      </M3IconButton>
    </M3ButtonGroup>
  );
}
