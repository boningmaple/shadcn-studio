import { MDToggleButton } from "@/ui/material-design/components/md-toggle-button/md-toggle-button";

export default function MDToggleButtonDemo() {
  return (
    <div className="grid w-full gap-8">
      <ToggleButtonStateRow isSelected={false} label="Unselected" />
      <ToggleButtonStateRow isSelected label="Selected" />
    </div>
  );
}

function ToggleButtonStateRow({
  isSelected,
  label,
}: {
  isSelected: boolean;
  label: string;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-center text-sm font-medium text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MDToggleButton isSelected={isSelected} variant="outlined">
          Enabled
        </MDToggleButton>
        <MDToggleButton isDisabled isSelected={isSelected} variant="outlined">
          Disabled
        </MDToggleButton>
        <MDToggleButton
          className="before:opacity-[0.08]"
          isSelected={isSelected}
          variant="outlined"
        >
          Hovered
        </MDToggleButton>
        <MDToggleButton
          className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
          isSelected={isSelected}
          variant="outlined"
        >
          Focused
        </MDToggleButton>
        <MDToggleButton
          className="rounded-[8px] before:opacity-[0.1] data-selected:rounded-[8px]"
          isSelected={isSelected}
          variant="outlined"
        >
          Pressed
        </MDToggleButton>
      </div>
    </div>
  );
}
