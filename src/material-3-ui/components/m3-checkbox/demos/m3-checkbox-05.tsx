import { M3Checkbox } from "@/material-3-ui/components/m3-checkbox/m3-checkbox";

export default function M3CheckboxDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <M3Checkbox isDisabled>Unavailable option</M3Checkbox>
      <M3Checkbox isDisabled isSelected>
        Locked selected option
      </M3Checkbox>
      <M3Checkbox isReadOnly isSelected>
        Read-only selected option
      </M3Checkbox>
    </div>
  );
}
