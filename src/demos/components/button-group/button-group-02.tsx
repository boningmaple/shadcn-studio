import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ListIcon,
} from "lucide-react";

import { ButtonGroup } from "@/components/button-group/button-group";
import { IconButton } from "@/components/icon-button/icon-button";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Paragraph tools" spacing="compact">
      <IconButton aria-label="Align left" variant="tonal">
        <AlignLeftIcon />
      </IconButton>
      <IconButton aria-label="Align center" variant="tonal">
        <AlignCenterIcon />
      </IconButton>
      <IconButton aria-label="Align right" variant="tonal">
        <AlignRightIcon />
      </IconButton>
      <IconButton aria-label="Bulleted list" variant="outlined">
        <ListIcon />
      </IconButton>
    </ButtonGroup>
  );
}
