import { LinearProgressIndicator } from "@/components/progress-indicator/progress-indicator";

export default function ProgressIndicatorDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <LinearProgressIndicator value={60}>
        Uploading files
      </LinearProgressIndicator>
      <LinearProgressIndicator value={0}>
        Syncing contacts
      </LinearProgressIndicator>
      <LinearProgressIndicator>Indeterminate</LinearProgressIndicator>
    </div>
  );
}
