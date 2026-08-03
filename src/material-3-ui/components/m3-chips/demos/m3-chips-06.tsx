import {
  M3Chip,
  M3ChipGroup,
  M3ChipList,
} from "@/material-3-ui/components/m3-chips/m3-chips";

export default function M3ChipsDemo() {
  return (
    <div className="grid w-full gap-8">
      <FilterStateRow isSelected={false} label="Unselected" />
      <FilterStateRow isSelected label="Selected" />
    </div>
  );
}

function FilterStateRow({
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
      <M3ChipGroup
        aria-label={`${label} outlined filter chip states`}
        defaultSelectedKeys={isSelected ? stateKeys : undefined}
        variant="filter"
      >
        <M3ChipList className="justify-center gap-x-4">
          <M3Chip id="enabled">Enabled</M3Chip>
          <M3Chip id="disabled" isDisabled>
            Disabled
          </M3Chip>
          <M3Chip
            className={`${hoveredClass} ${isSelected ? selectedHoverShadow : ""}`}
            id="hovered"
          >
            Hovered
          </M3Chip>
          <M3Chip className={focusedClass} id="focused">
            Focused
          </M3Chip>
          <M3Chip className={pressedClass} id="pressed">
            Pressed
          </M3Chip>
        </M3ChipList>
      </M3ChipGroup>
    </div>
  );
}

const stateKeys = new Set([
  "enabled",
  "disabled",
  "hovered",
  "focused",
  "pressed",
]);
const hoveredClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.08]";
const selectedHoverShadow =
  "[&_[data-slot=chip-surface]]:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]";
const focusedClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.1] [&_[data-slot=chip-surface]]:outline-2 [&_[data-slot=chip-surface]]:outline-solid [&_[data-slot=chip-surface]]:outline-offset-2 [&_[data-slot=chip-surface]]:outline-[#6750a4] dark:[&_[data-slot=chip-surface]]:outline-[#d0bcff]";
const pressedClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.1]";
