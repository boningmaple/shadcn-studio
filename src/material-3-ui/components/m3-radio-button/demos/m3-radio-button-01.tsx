import {
  M3RadioButton,
  M3RadioGroup,
} from "@/material-3-ui/components/m3-radio-button/m3-radio-button";

export default function M3RadioButtonDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <M3RadioGroup
        aria-label="Enabled radio buttons"
        className="gap-1"
        defaultValue="selected"
      >
        <M3RadioButton value="unselected">Unselected</M3RadioButton>
        <M3RadioButton value="selected">Selected</M3RadioButton>
      </M3RadioGroup>
      <M3RadioGroup
        aria-label="Disabled radio buttons"
        className="gap-1"
        defaultValue="selected"
        isDisabled
      >
        <M3RadioButton value="unselected">Disabled unselected</M3RadioButton>
        <M3RadioButton value="selected">Disabled selected</M3RadioButton>
      </M3RadioGroup>
    </div>
  );
}
