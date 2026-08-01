import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md items-center justify-center rounded-[28px] bg-[#fffbfe] px-6 py-16 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]">
      <LoadingIndicator
        appearance="surface"
        label="Syncing your inbox"
        size="md"
      />
    </div>
  );
}
