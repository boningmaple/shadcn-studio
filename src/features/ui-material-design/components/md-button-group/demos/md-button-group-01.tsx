import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";

import { MDButtonGroup } from "@/features/ui-material-design/components/md-button-group/md-button-group";
import { MDButton } from "@/features/ui-material-design/components/md-button/md-button";

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
