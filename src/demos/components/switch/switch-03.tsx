import * as React from "react";

import { Switch } from "@/components/switch/switch";

export default function SwitchDemo() {
  const [airplaneMode, setAirplaneMode] = React.useState(false);

  return (
    <div className="grid w-full max-w-sm gap-1">
      <Switch isSelected={airplaneMode} onChange={setAirplaneMode}>
        Airplane mode
      </Switch>
      <Switch isDisabled={airplaneMode}>Cellular data</Switch>
      <Switch defaultSelected isDisabled={airplaneMode}>
        Personal hotspot
      </Switch>
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
