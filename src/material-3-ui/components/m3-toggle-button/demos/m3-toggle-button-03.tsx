import { M3ToggleButton } from "@/material-3-ui/components/m3-toggle-button/m3-toggle-button";

export default function M3ToggleButtonDemo() {
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
        <M3ToggleButton isSelected={isSelected} variant="elevated">
          Enabled
        </M3ToggleButton>
        <M3ToggleButton isDisabled isSelected={isSelected} variant="elevated">
          Disabled
        </M3ToggleButton>
        <M3ToggleButton
          className="before:opacity-[0.08] shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]"
          isSelected={isSelected}
          variant="elevated"
        >
          Hovered
        </M3ToggleButton>
        <M3ToggleButton
          className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
          isSelected={isSelected}
          variant="elevated"
        >
          Focused
        </M3ToggleButton>
        <M3ToggleButton
          className="rounded-[8px] before:opacity-[0.1] data-selected:rounded-[8px]"
          isSelected={isSelected}
          variant="elevated"
        >
          Pressed
        </M3ToggleButton>
      </div>
    </div>
  );
}
