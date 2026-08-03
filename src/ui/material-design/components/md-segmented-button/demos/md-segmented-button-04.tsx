import {
  MDSegmentedButton,
  MDSegmentedButtonGroup,
} from "@/ui/material-design/components/md-segmented-button/md-segmented-button";

export default function MDSegmentedButtonDemo() {
  return (
    <div className="grid gap-5">
      <MDSegmentedButtonGroup
        aria-label="Compact priority"
        defaultSelectedKeys={["medium"]}
        density="compact"
        selectionMode="single"
      >
        <MDSegmentedButton id="low">Low</MDSegmentedButton>
        <MDSegmentedButton id="medium">Medium</MDSegmentedButton>
        <MDSegmentedButton id="high" isDisabled>
          High
        </MDSegmentedButton>
      </MDSegmentedButtonGroup>
      <MDSegmentedButtonGroup
        aria-label="Vertical placement"
        defaultSelectedKeys={["top"]}
        orientation="vertical"
        selectionMode="single"
      >
        <MDSegmentedButton id="top">Top</MDSegmentedButton>
        <MDSegmentedButton id="center">Center</MDSegmentedButton>
        <MDSegmentedButton id="bottom">Bottom</MDSegmentedButton>
      </MDSegmentedButtonGroup>
    </div>
  );
}
