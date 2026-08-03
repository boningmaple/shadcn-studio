import { MDCheckbox } from "@/ui/material-design/components/md-checkbox/md-checkbox";

export default function MDCheckboxDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <MDCheckbox>Receive activity updates</MDCheckbox>
      <MDCheckbox defaultSelected>Sync calendar events</MDCheckbox>
      <MDCheckbox isIndeterminate>Partially selected workspace</MDCheckbox>
    </div>
  );
}
