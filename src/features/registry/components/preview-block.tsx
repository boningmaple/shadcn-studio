import { AstroidIcon, CodeIcon, EyeIcon, TerminalIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/shared/components/copy-button";
import { OpenNewTabButton } from "@/shared/components/open-new-tab-button";

import { usePreviewSize } from "../hooks/use-preview-size";
import { usePreviewTheme } from "../hooks/use-preview-theme";
import { previewUrl as getPreviewUrl } from "../lib/registry-catalog.ts";
import type { VibeBuiltRegistryItem } from "../types/registry.ts";
import { CodePanel } from "./code-panel";
import { PreviewPanel } from "./preview-panel";
import { PreviewSizeToggleGroup } from "./preview-size-toggle-group";
import { PreviewThemeSwitchButton } from "./preview-theme-switch-button";
import { PromptPanel } from "./prompt-panel";
import ResetPreviewButton from "./reset-preview-button";

export type PreviewTab = "code" | "preview" | "prompt";

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
  const installCommand = `npx shadcn@latest add boningmaple/shadcn-studio/${props.item.name}`;
  const newTabUrl = `${previewUrl}?theme=${previewTheme}`;

  return (
    <article id={props.item.name} className="scroll-mt-20">
      <h2>{props.item.title}</h2>
      <p>{props.item.description}</p>

      <Tabs
        selectedKey={selectedTab}
        className="gap-0"
        onSelectionChange={(key) => setSelectedTab(key as PreviewTab)}
      >
        <div className="not-prose sticky top-(--header-height) lg:top-0 z-20 flex items-center justify-between gap-2 bg-background py-2">
          <div className="flex min-w-0 items-center gap-2">
            <TabsList
              aria-label="Preview block tabs"
              className="shrink-0 group-data-horizontal/tabs:h-fit p-1 gap-1 *:data-[slot=tabs-trigger]:size-7 *:data-[slot=tabs-trigger]:p-0 *:data-[slot=tabs-trigger]:[&_svg]:size-4 *:data-[slot=tabs-trigger]:transition-none"
            >
              <TabsTrigger id={"preview" satisfies PreviewTab} aria-label="Preview">
                <EyeIcon />
              </TabsTrigger>
              <TabsTrigger id={"code" satisfies PreviewTab} aria-label="Code">
                <CodeIcon />
              </TabsTrigger>
              <TabsTrigger id={"prompt" satisfies PreviewTab} aria-label="Prompt">
                <AstroidIcon />
              </TabsTrigger>
            </TabsList>
            <CopyButton
              aria-label={`Copy install command for ${props.item.title}`}
              content={installCommand}
              icon={<TerminalIcon />}
              label={`npx shadcn add ${props.item.name}`}
              errorMessage="Could not copy install command."
              successMessage="Install command copied."
              variant="outline"
              size="default"
              className="min-w-0 shrink justify-start"
            />
          </div>
          {selectedTab === "preview" ? (
            <div
              aria-label="Preview controls"
              role="toolbar"
              className="flex shrink-0 items-center gap-2 lg:pr-3"
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
          className="not-prose data-inert:hidden"
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
          className="not-prose data-inert:hidden"
        >
          <CodePanel item={props.item} />
        </TabsContent>
        <TabsContent id={"prompt" satisfies PreviewTab}>
          <PromptPanel prompt={props.item.meta.prompt} />
        </TabsContent>
      </Tabs>
    </article>
  );
}
