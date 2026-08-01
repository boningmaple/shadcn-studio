import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="grid w-full max-w-sm gap-10">
      <LoadingIndicator label="Loading your library" />
      <LoadingIndicator label="Refreshing suggestions" size="sm" />
    </div>
  );
}
