import { M3LoadingIndicator } from "@/material-3-ui/components/m3-loading-indicator/m3-loading-indicator";

export default function M3LoadingIndicatorDemo() {
  return (
    <div className="flex min-h-60 w-full max-w-md flex-col items-center justify-center rounded-[28px] bg-[#f7f2fa] p-8 dark:bg-[#211f26]">
      <M3LoadingIndicator
        appearance="tonal"
        label="Starting the workspace"
        size="xl"
      />
    </div>
  );
}
