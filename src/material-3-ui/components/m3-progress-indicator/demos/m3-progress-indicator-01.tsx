import { M3LinearProgressIndicator } from "@/material-3-ui/components/m3-progress-indicator/m3-progress-indicator";

export default function M3ProgressIndicatorDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <M3LinearProgressIndicator value={60}>
        Uploading files
      </M3LinearProgressIndicator>
      <M3LinearProgressIndicator value={0}>
        Syncing contacts
      </M3LinearProgressIndicator>
      <M3LinearProgressIndicator>Indeterminate</M3LinearProgressIndicator>
    </div>
  );
}
