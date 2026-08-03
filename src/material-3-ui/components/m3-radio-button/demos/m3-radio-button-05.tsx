import * as React from "react";

import {
  M3RadioButton,
  M3RadioGroup,
  M3RadioGroupDescription,
  M3RadioGroupLabel,
} from "@/material-3-ui/components/m3-radio-button/m3-radio-button";

export default function M3RadioButtonDemo() {
  const [scheme, setScheme] = React.useState("system");

  return (
    <div className="grid w-full max-w-sm gap-6">
      <M3RadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        onChange={setScheme}
        value={scheme}
      >
        <M3RadioGroupLabel>Color scheme</M3RadioGroupLabel>
        <M3RadioGroupDescription>
          Choose how the interface adapts to your environment.
        </M3RadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <M3RadioButton value="system">Follow system</M3RadioButton>
          <M3RadioButton value="light">Light</M3RadioButton>
          <M3RadioButton value="dark">Dark</M3RadioButton>
        </div>
      </M3RadioGroup>
      <p className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Selected scheme:{" "}
        <span className="font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          {scheme}
        </span>
      </p>
    </div>
  );
}
