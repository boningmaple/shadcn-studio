import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm items-end justify-around">
      <LoadingIndicator aria-label="Loading" size="xs" />
      <LoadingIndicator aria-label="Loading" size="sm" />
      <LoadingIndicator aria-label="Loading" size="md" />
      <LoadingIndicator aria-label="Loading" size="lg" />
      <LoadingIndicator aria-label="Loading" size="xl" />
    </div>
  );
}
