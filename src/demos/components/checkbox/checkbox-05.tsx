import { Checkbox } from "@/components/checkbox/checkbox";

export default function CheckboxDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <Checkbox isDisabled>Unavailable option</Checkbox>
      <Checkbox isDisabled isSelected>
        Locked selected option
      </Checkbox>
      <Checkbox isReadOnly isSelected>
        Read-only selected option
      </Checkbox>
    </div>
  );
}
