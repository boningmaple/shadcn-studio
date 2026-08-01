import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="grid w-full max-w-md gap-8">
      <LoadingIndicator
        appearance="tonal"
        label="Loading your library"
        size="lg"
      />
      <LoadingIndicator
        appearance="surface"
        label="Refreshing suggestions"
        layout="inline"
        size="sm"
      />
    </div>
  );
}
