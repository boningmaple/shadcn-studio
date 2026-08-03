import * as React from "react";

import {
  M3Checkbox,
  M3CheckboxGroup,
} from "@/material-3-ui/components/m3-checkbox/m3-checkbox";

const items = ["camera", "microphone", "location"] as const;

export default function M3CheckboxDemo() {
  const [selected, setSelected] = React.useState<string[]>(["camera"]);
  const allSelected = selected.length === items.length;
  const isIndeterminate = selected.length > 0 && !allSelected;

  function toggleAll(isSelected: boolean) {
    setSelected(isSelected ? [...items] : []);
  }

  return (
    <div className="grid w-full max-w-sm gap-2">
      <M3Checkbox
        isIndeterminate={isIndeterminate}
        isSelected={allSelected}
        onChange={toggleAll}
      >
        Enable all permissions
      </M3Checkbox>
      <M3CheckboxGroup
        aria-label="Permission choices"
        className="ms-13 gap-1"
        onChange={setSelected}
        value={selected}
      >
        <M3Checkbox value="camera">Camera</M3Checkbox>
        <M3Checkbox value="microphone">Microphone</M3Checkbox>
        <M3Checkbox value="location">Location</M3Checkbox>
      </M3CheckboxGroup>
    </div>
  );
}
