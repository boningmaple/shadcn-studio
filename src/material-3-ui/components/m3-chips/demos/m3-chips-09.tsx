import {
  M3Chip,
  M3ChipGroup,
  M3ChipList,
} from "@/material-3-ui/components/m3-chips/m3-chips";

export default function M3ChipsDemo() {
  return (
    <M3ChipGroup
      aria-label="Elevated suggestion chip states"
      surface="elevated"
      variant="suggestion"
    >
      <M3ChipList className="justify-center gap-x-4">
        <M3Chip id="enabled" onAction={noop}>
          Enabled
        </M3Chip>
        <M3Chip id="disabled" isDisabled onAction={noop}>
          Disabled
        </M3Chip>
        <M3Chip className={hoveredClass} id="hovered" onAction={noop}>
          Hovered
        </M3Chip>
        <M3Chip className={focusedClass} id="focused" onAction={noop}>
          Focused
        </M3Chip>
        <M3Chip className={pressedClass} id="pressed" onAction={noop}>
          Pressed
        </M3Chip>
      </M3ChipList>
    </M3ChipGroup>
  );
}

const hoveredClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.08] [&_[data-slot=chip-surface]]:shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]";
const focusedClass =
  "[&_[data-slot=chip-surface]]:before:opacity-[0.1] [&_[data-slot=chip-surface]]:outline-2 [&_[data-slot=chip-surface]]:outline-solid [&_[data-slot=chip-surface]]:outline-offset-2 [&_[data-slot=chip-surface]]:outline-[#6750a4] dark:[&_[data-slot=chip-surface]]:outline-[#d0bcff]";
const pressedClass = "[&_[data-slot=chip-surface]]:before:opacity-[0.1]";
const noop = () => undefined;
