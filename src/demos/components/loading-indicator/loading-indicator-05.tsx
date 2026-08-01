import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="flex min-h-60 w-full max-w-sm flex-col items-center justify-center gap-8">
      <LoadingIndicator label="Starting the workspace" size="xl" />
    </div>
  );
}
