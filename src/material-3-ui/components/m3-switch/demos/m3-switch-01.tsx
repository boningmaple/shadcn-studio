import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3SwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <M3Switch>Wi-Fi</M3Switch>
      <M3Switch defaultSelected>Bluetooth</M3Switch>
      <M3Switch isDisabled>Airplane mode</M3Switch>
      <M3Switch defaultSelected isDisabled>
        Personal hotspot
      </M3Switch>
    </div>
  );
}
