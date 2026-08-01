import * as React from "react";

import {
  RadioButton,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
} from "@/components/radio-button/radio-button";

export default function RadioButtonDemo() {
  const [scheme, setScheme] = React.useState("system");

  return (
    <div className="grid w-full max-w-sm gap-6">
      <RadioGroup
        className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
        onChange={setScheme}
        value={scheme}
      >
        <RadioGroupLabel>Color scheme</RadioGroupLabel>
        <RadioGroupDescription>
          Choose how the interface adapts to your environment.
        </RadioGroupDescription>
        <div className="mt-2 grid gap-1">
          <RadioButton value="system">Follow system</RadioButton>
          <RadioButton value="light">Light</RadioButton>
          <RadioButton value="dark">Dark</RadioButton>
        </div>
      </RadioGroup>
      <p className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Selected scheme:{" "}
        <span className="font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          {scheme}
        </span>
      </p>
    </div>
  );
}
