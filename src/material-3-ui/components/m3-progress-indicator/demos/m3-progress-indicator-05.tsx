import { M3CircularProgressIndicator } from "@/material-3-ui/components/m3-progress-indicator/m3-progress-indicator";

export default function M3ProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-around gap-8">
      <M3CircularProgressIndicator aria-label="Loading" value={25} />
      <M3CircularProgressIndicator aria-label="Loading" value={50} />
      <M3CircularProgressIndicator aria-label="Loading" value={75} />
      <M3CircularProgressIndicator aria-label="Loading" value={100} />
    </div>
  );
}
