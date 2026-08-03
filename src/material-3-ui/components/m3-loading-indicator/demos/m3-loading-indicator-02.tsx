import { M3LoadingIndicator } from "@/material-3-ui/components/m3-loading-indicator/m3-loading-indicator";

export default function M3LoadingIndicatorDemo() {
  return (
    <div className="grid w-full max-w-md gap-8">
      <M3LoadingIndicator
        appearance="tonal"
        label="Loading your library"
        size="lg"
      />
      <M3LoadingIndicator
        appearance="surface"
        label="Refreshing suggestions"
        layout="inline"
        size="sm"
      />
    </div>
  );
}
