import { Checkbox } from "@/components/checkbox/checkbox";

export default function CheckboxDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <Checkbox>Receive activity updates</Checkbox>
      <Checkbox defaultSelected>Sync calendar events</Checkbox>
      <Checkbox isIndeterminate>Partially selected workspace</Checkbox>
    </div>
  );
}
