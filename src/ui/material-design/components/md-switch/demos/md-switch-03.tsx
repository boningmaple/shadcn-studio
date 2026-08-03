import * as React from "react";

import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDSwitchDemo() {
  const [airplaneMode, setAirplaneMode] = React.useState(false);

  return (
    <div className="grid w-full max-w-sm gap-1">
      <MDSwitch isSelected={airplaneMode} onChange={setAirplaneMode}>
        Airplane mode
      </MDSwitch>
      <MDSwitch isDisabled={airplaneMode}>Cellular data</MDSwitch>
      <MDSwitch defaultSelected isDisabled={airplaneMode}>
        Personal hotspot
      </MDSwitch>
      <p className="mt-3 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
        Airplane mode is currently{" "}
        <span className="font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          {airplaneMode ? "on" : "off"}
        </span>
        .
      </p>
    </div>
  );
}
