import { MDLoadingIndicator } from "@/ui/material-design/components/md-loading-indicator/md-loading-indicator";

export default function MDLoadingIndicatorDemo() {
  return (
    <div className="flex min-h-60 w-full max-w-md flex-col items-center justify-center rounded-[28px] bg-[#f7f2fa] p-8 dark:bg-[#211f26]">
      <MDLoadingIndicator
        appearance="tonal"
        label="Starting the workspace"
        size="xl"
      />
    </div>
  );
}
