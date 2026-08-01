import { Switch } from "@/components/switch/switch";

export default function SwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <Switch>Wi-Fi</Switch>
      <Switch defaultSelected>Bluetooth</Switch>
      <Switch isDisabled>Airplane mode</Switch>
      <Switch defaultSelected isDisabled>
        Personal hotspot
      </Switch>
    </div>
  );
}
