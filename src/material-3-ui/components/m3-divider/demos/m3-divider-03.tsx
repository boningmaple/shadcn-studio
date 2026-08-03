import { M3Divider } from "@/material-3-ui/components/m3-divider/m3-divider";

const stats = [
  { value: "18", label: "Active" },
  { value: "42", label: "Queued" },
  { value: "7", label: "Paused" },
] as const;

export default function M3DividerDemo() {
  return (
    <div className="flex h-28 w-full max-w-lg items-stretch rounded-[28px] bg-[#fffbfe] px-4 py-5 text-[#1d1b20] shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:text-[#e6e0e9] dark:ring-[#49454f]">
      {stats.map((stat, index) => (
        <div className="flex min-w-0 flex-1 items-stretch" key={stat.label}>
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-3 text-center">
            <span className="text-2xl leading-8 font-medium">{stat.value}</span>
            <span className="mt-1 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              {stat.label}
            </span>
          </div>
          {index < stats.length - 1 ? (
            <M3Divider inset="both" orientation="vertical" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
