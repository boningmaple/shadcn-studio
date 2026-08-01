import { CircularProgressIndicator } from "@/components/progress-indicator/progress-indicator";

export default function ProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-around gap-8">
      <CircularProgressIndicator aria-label="Loading" value={25} />
      <CircularProgressIndicator aria-label="Loading" value={50} />
      <CircularProgressIndicator aria-label="Loading" value={75} />
      <CircularProgressIndicator aria-label="Loading" value={100} />
    </div>
  );
}
