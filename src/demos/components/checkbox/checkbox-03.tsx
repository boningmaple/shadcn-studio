import * as React from "react";

import { Checkbox, CheckboxGroup } from "@/components/checkbox/checkbox";

const items = ["camera", "microphone", "location"] as const;

export default function CheckboxDemo() {
  const [selected, setSelected] = React.useState<string[]>(["camera"]);
  const allSelected = selected.length === items.length;
  const isIndeterminate = selected.length > 0 && !allSelected;

  function toggleAll(isSelected: boolean) {
    setSelected(isSelected ? [...items] : []);
  }

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Checkbox
        isIndeterminate={isIndeterminate}
        isSelected={allSelected}
        onChange={toggleAll}
      >
        Enable all permissions
      </Checkbox>
      <CheckboxGroup
        aria-label="Permission choices"
        className="ms-13 gap-1"
        onChange={setSelected}
        value={selected}
      >
        <Checkbox value="camera">Camera</Checkbox>
        <Checkbox value="microphone">Microphone</Checkbox>
        <Checkbox value="location">Location</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
