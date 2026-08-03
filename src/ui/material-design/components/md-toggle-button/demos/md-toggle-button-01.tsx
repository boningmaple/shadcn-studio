import { MDToggleButton } from "@/ui/material-design/components/md-toggle-button/md-toggle-button";

export default function MDToggleButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <MDToggleButton variant="elevated">Elevated</MDToggleButton>
      <MDToggleButton variant="filled">Filled</MDToggleButton>
      <MDToggleButton variant="tonal">Tonal</MDToggleButton>
      <MDToggleButton variant="outlined">Outlined</MDToggleButton>
    </div>
  );
}
