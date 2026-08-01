import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupDescription,
  CheckboxGroupLabel,
} from "@/components/checkbox/checkbox";

export default function CheckboxDemo() {
  return (
    <CheckboxGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      defaultValue={["boarding", "gate"]}
    >
      <CheckboxGroupLabel>Travel notifications</CheckboxGroupLabel>
      <CheckboxGroupDescription>
        Choose the updates shown on your lock screen.
      </CheckboxGroupDescription>
      <div className="mt-2 grid gap-1">
        <Checkbox value="boarding">Boarding changes</Checkbox>
        <Checkbox value="gate">Gate updates</Checkbox>
        <Checkbox value="delay">Delay alerts</Checkbox>
      </div>
    </CheckboxGroup>
  );
}
