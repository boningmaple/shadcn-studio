import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3ButtonGroup } from "@/material-3-ui/components/m3-button-group/m3-button-group";

export default function M3ButtonGroupDemo() {
  return (
    <M3ButtonGroup aria-label="Wizard actions">
      <M3Button size="sm" variant="outlined">
        <ArrowLeftIcon />
        Back
      </M3Button>
      <M3Button size="sm" variant="tonal">
        Save draft
      </M3Button>
      <M3Button size="sm" variant="filled">
        Continue
        <ArrowRightIcon />
      </M3Button>
      <M3Button isDisabled size="sm" variant="filled">
        <CheckIcon />
        Complete
      </M3Button>
    </M3ButtonGroup>
  );
}
