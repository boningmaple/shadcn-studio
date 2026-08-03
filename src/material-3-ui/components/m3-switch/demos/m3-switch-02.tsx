import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3SwitchDemo() {
  return (
    <div className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
      <span className="text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
        Notifications
      </span>
      <div className="mt-2 grid gap-1">
        <M3Switch defaultSelected>Push notifications</M3Switch>
        <M3Switch defaultSelected>Email digest</M3Switch>
        <M3Switch>SMS alerts</M3Switch>
      </div>
    </div>
  );
}
