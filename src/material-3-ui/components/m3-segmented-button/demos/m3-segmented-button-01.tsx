import {
  M3SegmentedButton,
  M3SegmentedButtonGroup,
} from "@/material-3-ui/components/m3-segmented-button/m3-segmented-button";

export default function M3SegmentedButtonDemo() {
  return (
    <M3SegmentedButtonGroup
      aria-label="Task status"
      defaultSelectedKeys={["active"]}
      selectionMode="single"
    >
      <M3SegmentedButton id="all">All</M3SegmentedButton>
      <M3SegmentedButton id="active">Active</M3SegmentedButton>
      <M3SegmentedButton id="done">Done</M3SegmentedButton>
    </M3SegmentedButtonGroup>
  );
}
