import { M3LoadingIndicator } from "@/material-3-ui/components/m3-loading-indicator/m3-loading-indicator";

export default function M3LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md items-center justify-center rounded-[28px] bg-[#fffbfe] px-6 py-16 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
      <M3LoadingIndicator
        appearance="surface"
        label="Syncing your inbox"
        size="md"
      />
    </div>
  );
}
