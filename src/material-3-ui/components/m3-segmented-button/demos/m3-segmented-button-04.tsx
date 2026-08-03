import {
  M3SegmentedButton,
  M3SegmentedButtonGroup,
} from "@/material-3-ui/components/m3-segmented-button/m3-segmented-button";

export default function M3SegmentedButtonDemo() {
  return (
    <div className="grid gap-5">
      <M3SegmentedButtonGroup
        aria-label="Compact priority"
        defaultSelectedKeys={["medium"]}
        density="compact"
        selectionMode="single"
      >
        <M3SegmentedButton id="low">Low</M3SegmentedButton>
        <M3SegmentedButton id="medium">Medium</M3SegmentedButton>
        <M3SegmentedButton id="high" isDisabled>
          High
        </M3SegmentedButton>
      </M3SegmentedButtonGroup>
      <M3SegmentedButtonGroup
        aria-label="Vertical placement"
        defaultSelectedKeys={["top"]}
        orientation="vertical"
        selectionMode="single"
      >
        <M3SegmentedButton id="top">Top</M3SegmentedButton>
        <M3SegmentedButton id="center">Center</M3SegmentedButton>
        <M3SegmentedButton id="bottom">Bottom</M3SegmentedButton>
      </M3SegmentedButtonGroup>
    </div>
  );
}
