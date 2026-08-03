import { MDLinearProgressIndicator } from "@/ui/material-design/components/md-progress-indicator/md-progress-indicator";

export default function MDProgressIndicatorDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <MDLinearProgressIndicator value={60}>
        Uploading files
      </MDLinearProgressIndicator>
      <MDLinearProgressIndicator value={0}>
        Syncing contacts
      </MDLinearProgressIndicator>
      <MDLinearProgressIndicator>Indeterminate</MDLinearProgressIndicator>
    </div>
  );
}
