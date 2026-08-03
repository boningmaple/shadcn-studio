import {
  MDChip,
  MDChipGroup,
  MDChipList,
} from "@/ui/material-design/components/md-chips/md-chips";

export default function MDChipsDemo() {
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
      <MDChipGroup
        aria-label={`${label} elevated filter chip states`}
        defaultSelectedKeys={isSelected ? stateKeys : undefined}
        surface="elevated"
        variant="filter"
      >
        <MDChipList className="justify-center gap-x-4">
          <MDChip id="enabled">Enabled</MDChip>
          <MDChip id="disabled" isDisabled>
            Disabled
          </MDChip>
          <MDChip className={hoveredClass} id="hovered">
            Hovered
          </MDChip>
          <MDChip className={focusedClass} id="focused">
            Focused
          </MDChip>
          <MDChip className={pressedClass} id="pressed">
            Pressed
          </MDChip>
        </MDChipList>
      </MDChipGroup>
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
const hoveredClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.08] [&_[data-slot=chip-surface]]:shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]";
const focusedClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.1] [&_[data-slot=chip-surface]]:outline-2 [&_[data-slot=chip-surface]]:outline-solid [&_[data-slot=chip-surface]]:outline-offset-2 [&_[data-slot=chip-surface]]:outline-[#6750a4] dark:[&_[data-slot=chip-surface]]:outline-[#d0bcff]";
const pressedClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.1]";
