import * as React from "react";

import {
  MDRadioButton,
  MDRadioGroup,
  MDRadioGroupDescription,
  MDRadioGroupLabel,
} from "@/ui/material-design/components/md-radio-button/md-radio-button";

export default function MDRadioButtonDemo() {
  const [scheme, setScheme] = React.useState("system");

  return (
    <div className="grid w-full max-w-sm gap-6">
      <MDRadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        onChange={setScheme}
        value={scheme}
      >
        <MDRadioGroupLabel>Color scheme</MDRadioGroupLabel>
        <MDRadioGroupDescription>
          Choose how the interface adapts to your environment.
        </MDRadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <MDRadioButton value="system">Follow system</MDRadioButton>
          <MDRadioButton value="light">Light</MDRadioButton>
          <MDRadioButton value="dark">Dark</MDRadioButton>
        </div>
      </MDRadioGroup>
      <p className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Selected scheme:{" "}
        <span className="font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          {scheme}
        </span>
      </p>
    </div>
  );
}
