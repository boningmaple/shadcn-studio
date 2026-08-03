import {
  MDCheckbox,
  MDCheckboxGroup,
  MDCheckboxGroupDescription,
  MDCheckboxGroupLabel,
} from "@/ui/material-design/components/md-checkbox/md-checkbox";

export default function MDCheckboxDemo() {
  return (
    <MDCheckboxGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      defaultValue={["boarding", "gate"]}
    >
      <MDCheckboxGroupLabel>Travel notifications</MDCheckboxGroupLabel>
      <MDCheckboxGroupDescription>
        Choose the updates shown on your lock screen.
      </MDCheckboxGroupDescription>
      <div className="mt-2 grid gap-1">
        <MDCheckbox value="boarding">Boarding changes</MDCheckbox>
        <MDCheckbox value="gate">Gate updates</MDCheckbox>
        <MDCheckbox value="delay">Delay alerts</MDCheckbox>
      </div>
    </MDCheckboxGroup>
  );
}
