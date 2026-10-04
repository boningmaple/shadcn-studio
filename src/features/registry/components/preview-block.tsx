import { CodeIcon, EyeIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpenNewTabButton } from "@/shared/components/open-new-tab-button";

import { usePreviewSize } from "../hooks/use-preview-size";
import { usePreviewTheme } from "../hooks/use-preview-theme";
import { previewUrl as getPreviewUrl } from "../lib/registry-catalog.ts";
import type { VibeBuiltRegistryItem } from "../types/registry.ts";
import { CodePanel } from "./code-panel";
import { PreviewPanel } from "./preview-panel";
import { PreviewSizeToggleGroup } from "./preview-size-toggle-group";
import { PreviewThemeSwitchButton } from "./preview-theme-switch-button";
import ResetPreviewButton from "./reset-preview-button";

export type PreviewTab = "code" | "preview";

type PreviewBlockProps = {
  item: VibeBuiltRegistryItem;
};

export function PreviewBlock(props: PreviewBlockProps) {
  const [selectedTab, setSelectedTab] = useState<PreviewTab>("preview" satisfies PreviewTab);
  const { previewPanelRef, selectedPreviewSize, onPreviewSizeSelect, onPreviewPanelResize } =
    usePreviewSize();
  const previewFrameRef = useRef<HTMLIFrameElement>(null);
  const { previewTheme, isFollowingAppTheme, setPreviewTheme } = usePreviewTheme(previewFrameRef);
  const previewUrl = getPreviewUrl(props.item);
  const newTabUrl = `${previewUrl}?theme=${previewTheme}`;

  return (
    <article id={props.item.name} className="scroll-mt-20">
      <h2>{props.item.title}</h2>
      <p>{props.item.description}</p>

      <Tabs
        selectedKey={selectedTab}
        className="not-prose gap-0"
        onSelectionChange={(key) => setSelectedTab(key as PreviewTab)}
      >
        <div className="sticky top-(--header-height) lg:top-0 z-20 flex items-center justify-between bg-background py-2">
          <TabsList
            aria-label="Preview block tabs"
            className="group-data-horizontal/tabs:h-fit p-1 gap-1 *:data-[slot=tabs-trigger]:size-7 *:data-[slot=tabs-trigger]:p-0 *:data-[slot=tabs-trigger]:[&_svg]:size-4 *:data-[slot=tabs-trigger]:transition-none"
          >
            <TabsTrigger id={"preview" satisfies PreviewTab} aria-label="Preview">
              <EyeIcon />
            </TabsTrigger>
            <TabsTrigger id={"code" satisfies PreviewTab} aria-label="Code">
              <CodeIcon />
            </TabsTrigger>
          </TabsList>
          {selectedTab === "preview" ? (
            <div
              aria-label="Preview controls"
              role="toolbar"
              className="flex items-center gap-2 lg:pr-3"
            >
              <PreviewSizeToggleGroup
                selectedPreviewSize={selectedPreviewSize}
                onPreviewSizeSelect={onPreviewSizeSelect}
              />
              <PreviewThemeSwitchButton
                previewTheme={previewTheme}
                isFollowingAppTheme={isFollowingAppTheme}
                setPreviewTheme={setPreviewTheme}
              />
              <ResetPreviewButton previewFrameRef={previewFrameRef} />
              <OpenNewTabButton label="Open in a new tab" url={newTabUrl} />
            </div>
          ) : null}
        </div>
        <TabsContent
          id={"preview" satisfies PreviewTab}
          shouldForceMount
          className="data-inert:hidden"
        >
          <PreviewPanel
            frameRef={previewFrameRef}
            panelRef={previewPanelRef}
            href={previewUrl}
            title={`${props.item.title} Preview`}
            height={props.item.meta.height}
            selectedPreviewSize={selectedPreviewSize}
            onPreviewPanelResize={onPreviewPanelResize}
          />
        </TabsContent>
        <TabsContent
          id={"code" satisfies PreviewTab}
          shouldForceMount
          className="data-inert:hidden"
        >
          <CodePanel item={props.item} />
        </TabsContent>
      </Tabs>
    </article>
  );
}
