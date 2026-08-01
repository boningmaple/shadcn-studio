import {
  RadioButton,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
} from "@/components/radio-button/radio-button";

export default function RadioButtonDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <RadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        defaultValue="french"
        isDisabled
      >
        <RadioGroupLabel>Speaker language</RadioGroupLabel>
        <RadioGroupDescription>
          The assistant voice cannot be changed right now.
        </RadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <RadioButton value="english">English</RadioButton>
          <RadioButton value="french">French</RadioButton>
          <RadioButton value="spanish">Spanish</RadioButton>
        </div>
      </RadioGroup>
      <RadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        defaultValue="weekly"
        isReadOnly
      >
        <RadioGroupLabel>Report frequency</RadioGroupLabel>
        <RadioGroupDescription>
          Set by your administrator and locked for this session.
        </RadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <RadioButton value="daily">Daily</RadioButton>
          <RadioButton value="weekly">Weekly</RadioButton>
        </div>
      </RadioGroup>
    </div>
  );
}
