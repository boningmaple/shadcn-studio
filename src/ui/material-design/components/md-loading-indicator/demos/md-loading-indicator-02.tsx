import { MDLoadingIndicator } from "@/ui/material-design/components/md-loading-indicator/md-loading-indicator";

export default function MDLoadingIndicatorDemo() {
  return (
    <div className="grid w-full max-w-md gap-8">
      <MDLoadingIndicator
        appearance="tonal"
        label="Loading your library"
        size="lg"
      />
      <MDLoadingIndicator
        appearance="surface"
        label="Refreshing suggestions"
        layout="inline"
        size="sm"
      />
    </div>
  );
}
