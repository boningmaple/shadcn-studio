import * as React from "react";

import {
  MDCheckbox,
  MDCheckboxGroup,
} from "@/ui/material-design/components/md-checkbox/md-checkbox";

const items = ["camera", "microphone", "location"] as const;

export default function MDCheckboxDemo() {
  const [selected, setSelected] = React.useState<string[]>(["camera"]);
  const allSelected = selected.length === items.length;
  const isIndeterminate = selected.length > 0 && !allSelected;

  function toggleAll(isSelected: boolean) {
    setSelected(isSelected ? [...items] : []);
  }

  return (
    <div className="grid w-full max-w-sm gap-2">
      <MDCheckbox
        isIndeterminate={isIndeterminate}
        isSelected={allSelected}
        onChange={toggleAll}
      >
        Enable all permissions
      </MDCheckbox>
      <MDCheckboxGroup
        aria-label="Permission choices"
        className="ms-13 gap-1"
        onChange={setSelected}
        value={selected}
      >
        <MDCheckbox value="camera">Camera</MDCheckbox>
        <MDCheckbox value="microphone">Microphone</MDCheckbox>
        <MDCheckbox value="location">Location</MDCheckbox>
      </MDCheckboxGroup>
    </div>
  );
}
