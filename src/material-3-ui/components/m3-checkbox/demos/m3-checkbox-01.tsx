import { M3Checkbox } from "@/material-3-ui/components/m3-checkbox/m3-checkbox";

export default function M3CheckboxDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <M3Checkbox>Receive activity updates</M3Checkbox>
      <M3Checkbox defaultSelected>Sync calendar events</M3Checkbox>
      <M3Checkbox isIndeterminate>Partially selected workspace</M3Checkbox>
    </div>
  );
}
