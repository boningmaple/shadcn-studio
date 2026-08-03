import { MDCircularProgressIndicator } from "@/ui/material-design/components/md-progress-indicator/md-progress-indicator";

export default function MDProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-around gap-8">
      <MDCircularProgressIndicator aria-label="Loading" value={25} />
      <MDCircularProgressIndicator aria-label="Loading" value={50} />
      <MDCircularProgressIndicator aria-label="Loading" value={75} />
      <MDCircularProgressIndicator aria-label="Loading" value={100} />
    </div>
  );
}
