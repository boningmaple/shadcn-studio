import {
  RadioButton,
  RadioGroup,
} from "@/components/radio-button/radio-button";

export default function RadioButtonDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <RadioGroup
        aria-label="Enabled radio buttons"
        className="gap-1"
        defaultValue="selected"
      >
        <RadioButton value="unselected">Unselected</RadioButton>
        <RadioButton value="selected">Selected</RadioButton>
      </RadioGroup>
      <RadioGroup
        aria-label="Disabled radio buttons"
        className="gap-1"
        defaultValue="selected"
        isDisabled
      >
        <RadioButton value="unselected">Disabled unselected</RadioButton>
        <RadioButton value="selected">Disabled selected</RadioButton>
      </RadioGroup>
    </div>
  );
}
