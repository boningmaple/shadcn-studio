import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md items-end justify-around gap-5">
      <LoadingIndicator aria-label="Loading" appearance="plain" size="xs" />
      <LoadingIndicator aria-label="Loading" appearance="plain" size="sm" />
      <LoadingIndicator aria-label="Loading" appearance="plain" size="md" />
      <LoadingIndicator aria-label="Loading" appearance="plain" size="lg" />
      <LoadingIndicator aria-label="Loading" appearance="plain" size="xl" />
    </div>
  );
}
