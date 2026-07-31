import { Chip, ChipGroup, ChipList } from "@/components/chips/chips";

export default function ChipsDemo() {
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
      <ChipGroup
        aria-label={`${label} outlined filter chip states`}
        defaultSelectedKeys={isSelected ? stateKeys : undefined}
        variant="filter"
      >
        <ChipList className="justify-center gap-x-4">
          <Chip id="enabled">Enabled</Chip>
          <Chip id="disabled" isDisabled>
            Disabled
          </Chip>
          <Chip
            className={`${hoveredClass} ${isSelected ? selectedHoverShadow : ""}`}
            id="hovered"
          >
            Hovered
          </Chip>
          <Chip className={focusedClass} id="focused">
            Focused
          </Chip>
          <Chip className={pressedClass} id="pressed">
            Pressed
          </Chip>
        </ChipList>
      </ChipGroup>
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
