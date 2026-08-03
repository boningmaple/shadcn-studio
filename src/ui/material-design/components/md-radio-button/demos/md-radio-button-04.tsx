import {
  MDRadioButton,
  MDRadioGroup,
  MDRadioGroupDescription,
  MDRadioGroupLabel,
} from "@/ui/material-design/components/md-radio-button/md-radio-button";

export default function MDRadioButtonDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <MDRadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        defaultValue="french"
        isDisabled
      >
        <MDRadioGroupLabel>Speaker language</MDRadioGroupLabel>
        <MDRadioGroupDescription>
          The assistant voice cannot be changed right now.
        </MDRadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <MDRadioButton value="english">English</MDRadioButton>
          <MDRadioButton value="french">French</MDRadioButton>
          <MDRadioButton value="spanish">Spanish</MDRadioButton>
        </div>
      </MDRadioGroup>
      <MDRadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        defaultValue="weekly"
        isReadOnly
      >
        <MDRadioGroupLabel>Report frequency</MDRadioGroupLabel>
        <MDRadioGroupDescription>
          Set by your administrator and locked for this session.
        </MDRadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <MDRadioButton value="daily">Daily</MDRadioButton>
          <MDRadioButton value="weekly">Weekly</MDRadioButton>
        </div>
      </MDRadioGroup>
    </div>
  );
}
