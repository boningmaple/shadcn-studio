import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDSwitchDemo() {
  return (
    <div className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
      <span className="text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
        Notifications
      </span>
      <div className="mt-2 grid gap-1">
        <MDSwitch defaultSelected>Push notifications</MDSwitch>
        <MDSwitch defaultSelected>Email digest</MDSwitch>
        <MDSwitch>SMS alerts</MDSwitch>
      </div>
    </div>
  );
}
