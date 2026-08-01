import {
  SegmentedButton,
  SegmentedButtonGroup,
} from "@/components/segmented-button/segmented-button";

export default function SegmentedButtonDemo() {
  return (
    <SegmentedButtonGroup
      aria-label="Task status"
      defaultSelectedKeys={["active"]}
      selectionMode="single"
    >
      <SegmentedButton id="all">All</SegmentedButton>
      <SegmentedButton id="active">Active</SegmentedButton>
      <SegmentedButton id="done">Done</SegmentedButton>
    </SegmentedButtonGroup>
  );
}
