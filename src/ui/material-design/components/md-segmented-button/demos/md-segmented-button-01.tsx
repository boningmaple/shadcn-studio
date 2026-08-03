import {
  MDSegmentedButton,
  MDSegmentedButtonGroup,
} from "@/ui/material-design/components/md-segmented-button/md-segmented-button";

export default function MDSegmentedButtonDemo() {
  return (
    <MDSegmentedButtonGroup
      aria-label="Task status"
      defaultSelectedKeys={["active"]}
      selectionMode="single"
    >
      <MDSegmentedButton id="all">All</MDSegmentedButton>
      <MDSegmentedButton id="active">Active</MDSegmentedButton>
      <MDSegmentedButton id="done">Done</MDSegmentedButton>
    </MDSegmentedButtonGroup>
  );
}
