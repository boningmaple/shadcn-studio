import {
  CircularProgressIndicator,
  LinearProgressIndicator,
} from "@/components/progress-indicator/progress-indicator";

export default function ProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm items-center justify-around gap-6">
      <CircularProgressIndicator value={70}>Loading</CircularProgressIndicator>
      <LinearProgressIndicator
        aria-label="Loading"
        className="w-40"
        value={70}
      />
    </div>
  );
}
