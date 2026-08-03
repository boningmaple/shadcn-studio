import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDButtonGroup } from "@/ui/material-design/components/md-button-group/md-button-group";

export default function MDButtonGroupDemo() {
  return (
    <MDButtonGroup aria-label="Wizard actions">
      <MDButton size="sm" variant="outlined">
        <ArrowLeftIcon />
        Back
      </MDButton>
      <MDButton size="sm" variant="tonal">
        Save draft
      </MDButton>
      <MDButton size="sm" variant="filled">
        Continue
        <ArrowRightIcon />
      </MDButton>
      <MDButton isDisabled size="sm" variant="filled">
        <CheckIcon />
        Complete
      </MDButton>
    </MDButtonGroup>
  );
}
