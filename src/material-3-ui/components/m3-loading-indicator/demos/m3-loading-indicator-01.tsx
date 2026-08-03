import { M3LoadingIndicator } from "@/material-3-ui/components/m3-loading-indicator/m3-loading-indicator";

export default function M3LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md items-end justify-around gap-5">
      <M3LoadingIndicator aria-label="Loading" appearance="plain" size="xs" />
      <M3LoadingIndicator aria-label="Loading" appearance="plain" size="sm" />
      <M3LoadingIndicator aria-label="Loading" appearance="plain" size="md" />
      <M3LoadingIndicator aria-label="Loading" appearance="plain" size="lg" />
      <M3LoadingIndicator aria-label="Loading" appearance="plain" size="xl" />
    </div>
  );
}
