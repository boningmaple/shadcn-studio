import {
  MDRadioButton,
  MDRadioGroup,
} from "@/ui/material-design/components/md-radio-button/md-radio-button";

export default function MDRadioButtonDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <MDRadioGroup
        aria-label="Enabled radio buttons"
        className="gap-1"
        defaultValue="selected"
      >
        <MDRadioButton value="unselected">Unselected</MDRadioButton>
        <MDRadioButton value="selected">Selected</MDRadioButton>
      </MDRadioGroup>
      <MDRadioGroup
        aria-label="Disabled radio buttons"
        className="gap-1"
        defaultValue="selected"
        isDisabled
      >
        <MDRadioButton value="unselected">Disabled unselected</MDRadioButton>
        <MDRadioButton value="selected">Disabled selected</MDRadioButton>
      </MDRadioGroup>
    </div>
  );
}
