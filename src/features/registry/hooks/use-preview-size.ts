import { useState } from "react";
import { usePanelRef } from "react-resizable-panels";

// Includes the panel's two horizontal border pixels around the target iframe viewport width.
const previewPanelSize = {
  phone: 322,
  tablet: 642,
  desktop: "100%",
} as const;

export type PreviewSize = keyof typeof previewPanelSize;

export function usePreviewSize() {
  const previewPanelRef = usePanelRef();

  const [selectedPreviewSize, setSelectedPreviewSize] = useState<PreviewSize | null>(
    "desktop" satisfies PreviewSize,
  );

  const onPreviewSizeSelect = (size: PreviewSize) => {
    setSelectedPreviewSize(size);
    previewPanelRef.current?.resize(previewPanelSize[size]);
  };

  const onPreviewPanelResize = () => {
    setSelectedPreviewSize(null);
  };

  return {
    previewPanelRef,
    selectedPreviewSize,
    onPreviewSizeSelect,
    onPreviewPanelResize,
  };
}
