import { Chip, ChipGroup, ChipList } from "@/components/chips/chips";

export default function ChipsDemo() {
  return (
    <ChipGroup
      aria-label="Outlined suggestion chip states"
      variant="suggestion"
    >
      <ChipList className="justify-center gap-x-4">
        <Chip id="enabled" onAction={noop}>
          Enabled
        </Chip>
        <Chip id="disabled" isDisabled onAction={noop}>
          Disabled
        </Chip>
        <Chip className={hoveredClass} id="hovered" onAction={noop}>
          Hovered
        </Chip>
        <Chip className={focusedClass} id="focused" onAction={noop}>
          Focused
        </Chip>
        <Chip className={pressedClass} id="pressed" onAction={noop}>
          Pressed
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}

const hoveredClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.08]";
const focusedClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.1] [&_[data-slot=chip-surface]]:outline-2 [&_[data-slot=chip-surface]]:outline-solid [&_[data-slot=chip-surface]]:outline-offset-2 [&_[data-slot=chip-surface]]:outline-[#6750a4] dark:[&_[data-slot=chip-surface]]:outline-[#d0bcff]";
const pressedClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.1]";
const noop = () => undefined;
