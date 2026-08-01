import {
  SegmentedButton,
  SegmentedButtonGroup,
} from "@/components/segmented-button/segmented-button";

export default function SegmentedButtonDemo() {
  return (
    <div className="grid gap-5">
      <SegmentedButtonGroup
        aria-label="Compact priority"
        defaultSelectedKeys={["medium"]}
        density="compact"
        selectionMode="single"
      >
        <SegmentedButton id="low">Low</SegmentedButton>
        <SegmentedButton id="medium">Medium</SegmentedButton>
        <SegmentedButton id="high" isDisabled>
          High
        </SegmentedButton>
      </SegmentedButtonGroup>
      <SegmentedButtonGroup
        aria-label="Vertical placement"
        defaultSelectedKeys={["top"]}
        orientation="vertical"
        selectionMode="single"
      >
        <SegmentedButton id="top">Top</SegmentedButton>
        <SegmentedButton id="center">Center</SegmentedButton>
        <SegmentedButton id="bottom">Bottom</SegmentedButton>
      </SegmentedButtonGroup>
    </div>
  );
}
