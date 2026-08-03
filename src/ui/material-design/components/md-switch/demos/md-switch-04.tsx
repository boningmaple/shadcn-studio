import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDSwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
        <span className="text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          Network
        </span>
        <div className="mt-2 grid gap-1">
          <MDSwitch defaultSelected isDisabled>
            Use 5G
          </MDSwitch>
          <MDSwitch defaultSelected isDisabled>
            Wi-Fi calling
          </MDSwitch>
          <MDSwitch isDisabled>Data roaming</MDSwitch>
        </div>
      </div>
      <div className="rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
        <span className="text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
          Security
        </span>
        <div className="mt-2 grid gap-1">
          <MDSwitch defaultSelected isReadOnly>
            Screen lock
          </MDSwitch>
          <MDSwitch isReadOnly>Auto lock</MDSwitch>
        </div>
      </div>
    </div>
  );
}
