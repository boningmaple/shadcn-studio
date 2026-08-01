import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="flex min-h-60 w-full max-w-md flex-col items-center justify-center rounded-[28px] bg-[#f7f2fa] p-8 dark:bg-[#211f26]">
      <LoadingIndicator
        appearance="tonal"
        label="Starting the workspace"
        size="xl"
      />
    </div>
  );
}
