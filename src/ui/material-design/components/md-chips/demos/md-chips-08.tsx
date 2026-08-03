import {
  MDChip,
  MDChipGroup,
  MDChipList,
} from "@/ui/material-design/components/md-chips/md-chips";

export default function MDChipsDemo() {
  return (
    <MDChipGroup
      aria-label="Outlined suggestion chip states"
      variant="suggestion"
    >
      <MDChipList className="justify-center gap-x-4">
        <MDChip id="enabled" onAction={noop}>
          Enabled
        </MDChip>
        <MDChip id="disabled" isDisabled onAction={noop}>
          Disabled
        </MDChip>
        <MDChip className={hoveredClass} id="hovered" onAction={noop}>
          Hovered
        </MDChip>
        <MDChip className={focusedClass} id="focused" onAction={noop}>
          Focused
        </MDChip>
        <MDChip className={pressedClass} id="pressed" onAction={noop}>
          Pressed
        </MDChip>
      </MDChipList>
    </MDChipGroup>
  );
}

const hoveredClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.08]";
const focusedClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.1] [&_[data-slot=chip-surface]]:outline-2 [&_[data-slot=chip-surface]]:outline-solid [&_[data-slot=chip-surface]]:outline-offset-2 [&_[data-slot=chip-surface]]:outline-[#6750a4] dark:[&_[data-slot=chip-surface]]:outline-[#d0bcff]";
const pressedClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.1]";
const noop = () => undefined;
