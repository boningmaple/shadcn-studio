import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3SwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
        <span className="text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          Network
        </span>
        <div className="mt-2 grid gap-1">
          <M3Switch defaultSelected isDisabled>
            Use 5G
          </M3Switch>
          <M3Switch defaultSelected isDisabled>
            Wi-Fi calling
          </M3Switch>
          <M3Switch isDisabled>Data roaming</M3Switch>
        </div>
      </div>
      <div className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
        <span className="text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          Security
        </span>
        <div className="mt-2 grid gap-1">
          <M3Switch defaultSelected isReadOnly>
            Screen lock
          </M3Switch>
          <M3Switch isReadOnly>Auto lock</M3Switch>
        </div>
      </div>
    </div>
  );
}
