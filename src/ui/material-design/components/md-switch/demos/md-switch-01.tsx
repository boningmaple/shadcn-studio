import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDSwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <MDSwitch>Wi-Fi</MDSwitch>
      <MDSwitch defaultSelected>Bluetooth</MDSwitch>
      <MDSwitch isDisabled>Airplane mode</MDSwitch>
      <MDSwitch defaultSelected isDisabled>
        Personal hotspot
      </MDSwitch>
    </div>
  );
}
