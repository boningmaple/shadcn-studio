import { ToggleButton } from "@/components/toggle-button/toggle-button";

export default function ToggleButtonDemo() {
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
        <ToggleButton isSelected={isSelected} variant="outlined">
          Enabled
        </ToggleButton>
        <ToggleButton isDisabled isSelected={isSelected} variant="outlined">
          Disabled
        </ToggleButton>
        <ToggleButton
          className="before:opacity-[0.08]"
          isSelected={isSelected}
          variant="outlined"
        >
          Hovered
        </ToggleButton>
        <ToggleButton
          className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
          isSelected={isSelected}
          variant="outlined"
        >
          Focused
        </ToggleButton>
        <ToggleButton
          className="rounded-[8px] before:opacity-[0.1] data-selected:rounded-[8px]"
          isSelected={isSelected}
          variant="outlined"
        >
          Pressed
        </ToggleButton>
      </div>
    </div>
  );
}
