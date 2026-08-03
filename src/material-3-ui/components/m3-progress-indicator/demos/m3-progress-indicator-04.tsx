import {
  M3CircularProgressIndicator,
  M3LinearProgressIndicator,
} from "@/material-3-ui/components/m3-progress-indicator/m3-progress-indicator";

export default function M3ProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm items-center justify-around gap-6">
      <M3CircularProgressIndicator aria-label="Loading" />
      <M3LinearProgressIndicator aria-label="Loading" className="w-40" />
    </div>
  );
}
