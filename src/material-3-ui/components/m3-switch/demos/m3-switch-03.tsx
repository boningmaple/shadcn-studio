import * as React from "react";

import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3SwitchDemo() {
  const [airplaneMode, setAirplaneMode] = React.useState(false);

  return (
    <div className="grid w-full max-w-sm gap-1">
      <M3Switch isSelected={airplaneMode} onChange={setAirplaneMode}>
        Airplane mode
      </M3Switch>
      <M3Switch isDisabled={airplaneMode}>Cellular data</M3Switch>
      <M3Switch defaultSelected isDisabled={airplaneMode}>
        Personal hotspot
      </M3Switch>
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
