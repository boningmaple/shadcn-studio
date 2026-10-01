import { useHydrated } from "@tanstack/react-router";
import { useState } from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import type { PreviewSize } from "../hooks/use-preview-size";

type PreviewPanelProps = {
  frameRef: React.ComponentPropsWithRef<"iframe">["ref"];
  panelRef: React.Ref<PanelImperativeHandle | null>;
  href: string;
  title: string;
  height: number;
  selectedPreviewSize: PreviewSize | null;
  onPreviewPanelResize: () => void;
};

export function PreviewPanel({ frameRef, panelRef, ...props }: PreviewPanelProps) {
  const hydrated = useHydrated();
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);

  return (
    <ResizablePanelGroup
      disabled={isMobile}
      orientation="horizontal"
      style={{ height: props.height + 2 }}
      className="max-h-[max(2px,calc(100svh-6rem))] rounded-lg bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] bg-size-[20px_20px]"
      onLayoutChanged={(_, { isUserInteraction }) => {
        if (isUserInteraction) props.onPreviewPanelResize();
      }}
    >
      <ResizablePanel
        panelRef={panelRef}
        defaultSize="100%"
        minSize={320}
        groupResizeBehavior={
          props.selectedPreviewSize === "desktop" ? "preserve-relative-size" : "preserve-pixel-size"
        }
        className="size-full rounded-lg border bg-background"
      >
        {hydrated ? (
          <iframe
            ref={frameRef}
            src={props.href}
            title={props.title}
            loading="lazy"
            className={loaded ? "size-full" : "invisible size-full"}
            onLoad={() => setLoaded(true)}
          />
        ) : null}
      </ResizablePanel>
      <ResizableHandle className="hidden lg:flex w-3 cursor-col-resize bg-background after:absolute after:top-1/2 after:right-0 after:h-16 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-border after:transition-all" />
      <ResizablePanel defaultSize="0%" minSize="0%" />
    </ResizablePanelGroup>
  );
}
