import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import { ButtonGroup } from "@/components/button-group/button-group";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Wizard actions">
      <Button size="sm" variant="outlined">
        <ArrowLeftIcon />
        Back
      </Button>
      <Button size="sm" variant="tonal">
        Save draft
      </Button>
      <Button size="sm" variant="filled">
        Continue
        <ArrowRightIcon />
      </Button>
      <Button isDisabled size="sm" variant="filled">
        <CheckIcon />
        Complete
      </Button>
    </ButtonGroup>
  );
}
