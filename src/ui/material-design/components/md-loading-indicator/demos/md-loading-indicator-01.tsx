import { MDLoadingIndicator } from "@/ui/material-design/components/md-loading-indicator/md-loading-indicator";

export default function MDLoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md items-end justify-around gap-5">
      <MDLoadingIndicator aria-label="Loading" appearance="plain" size="xs" />
      <MDLoadingIndicator aria-label="Loading" appearance="plain" size="sm" />
      <MDLoadingIndicator aria-label="Loading" appearance="plain" size="md" />
      <MDLoadingIndicator aria-label="Loading" appearance="plain" size="lg" />
      <MDLoadingIndicator aria-label="Loading" appearance="plain" size="xl" />
    </div>
  );
}
