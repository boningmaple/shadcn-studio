import {
  MDCircularProgressIndicator,
  MDLinearProgressIndicator,
} from "@/ui/material-design/components/md-progress-indicator/md-progress-indicator";

export default function MDProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm items-center justify-around gap-6">
      <MDCircularProgressIndicator aria-label="Loading" />
      <MDLinearProgressIndicator aria-label="Loading" className="w-40" />
    </div>
  );
}
