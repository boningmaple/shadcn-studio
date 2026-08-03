import {
  M3Checkbox,
  M3CheckboxGroup,
  M3CheckboxGroupDescription,
  M3CheckboxGroupLabel,
} from "@/material-3-ui/components/m3-checkbox/m3-checkbox";

export default function M3CheckboxDemo() {
  return (
    <M3CheckboxGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      defaultValue={["boarding", "gate"]}
    >
      <M3CheckboxGroupLabel>Travel notifications</M3CheckboxGroupLabel>
      <M3CheckboxGroupDescription>
        Choose the updates shown on your lock screen.
      </M3CheckboxGroupDescription>
      <div className="mt-2 grid gap-1">
        <M3Checkbox value="boarding">Boarding changes</M3Checkbox>
        <M3Checkbox value="gate">Gate updates</M3Checkbox>
        <M3Checkbox value="delay">Delay alerts</M3Checkbox>
      </div>
    </M3CheckboxGroup>
  );
}
