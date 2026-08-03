import {
  M3RadioButton,
  M3RadioGroup,
  M3RadioGroupDescription,
  M3RadioGroupLabel,
} from "@/material-3-ui/components/m3-radio-button/m3-radio-button";

export default function M3RadioButtonDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <M3RadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        defaultValue="french"
        isDisabled
      >
        <M3RadioGroupLabel>Speaker language</M3RadioGroupLabel>
        <M3RadioGroupDescription>
          The assistant voice cannot be changed right now.
        </M3RadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <M3RadioButton value="english">English</M3RadioButton>
          <M3RadioButton value="french">French</M3RadioButton>
          <M3RadioButton value="spanish">Spanish</M3RadioButton>
        </div>
      </M3RadioGroup>
      <M3RadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        defaultValue="weekly"
        isReadOnly
      >
        <M3RadioGroupLabel>Report frequency</M3RadioGroupLabel>
        <M3RadioGroupDescription>
          Set by your administrator and locked for this session.
        </M3RadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <M3RadioButton value="daily">Daily</M3RadioButton>
          <M3RadioButton value="weekly">Weekly</M3RadioButton>
        </div>
      </M3RadioGroup>
    </div>
  );
}
