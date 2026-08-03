import { MDCheckbox } from "@/ui/material-design/components/md-checkbox/md-checkbox";

export default function MDCheckboxDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <MDCheckbox isDisabled>Unavailable option</MDCheckbox>
      <MDCheckbox isDisabled isSelected>
        Locked selected option
      </MDCheckbox>
      <MDCheckbox isReadOnly isSelected>
        Read-only selected option
      </MDCheckbox>
    </div>
  );
}
