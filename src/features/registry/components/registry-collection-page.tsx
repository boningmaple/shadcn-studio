import {
  CodeIcon,
  EyeIcon,
  MonitorIcon,
  ScanSquareIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { usePanelRef } from "react-resizable-panels";

import { LinkButton } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  RegistryPreviewThemeBoundary,
  RegistryPreviewThemeSwitch,
  useRegistryPreviewTheme,
} from "./registry-preview-theme";
import ResetPreviewButton from "./reset-preview-button";

export type RegistryCollectionItem = {
  description: string;
  name: string;
  Preview: ComponentType;
  previewHref: string;
  title: string;
};

type PreviewSize = "desktop" | "phone" | "tablet";

const previewWidths: Record<PreviewSize, number | string> = {
  desktop: "100%",
  phone: 320,
  tablet: 640,
};

export function RegistryCollectionPage({
  description,
  items,
  title,
}: {
  description: string;
  items: RegistryCollectionItem[];
  title: string;
}) {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>

      {items.map((item) => (
        <RegistryItemShowcase item={item} key={item.name} />
      ))}
    </>
  );
}

function RegistryItemShowcase({ item }: { item: RegistryCollectionItem }) {
  const isMobile = useIsMobile();
  const [, setCodeEnabled] = useState(false);
  const [previewSize, setPreviewSize] = useState<PreviewSize | null>("desktop");
  const previewPanelRef = usePanelRef();
  const [previewKey, setPreviewKey] = useState(0);
  const { setTheme: setPreviewTheme, theme: previewTheme } = useRegistryPreviewTheme();
  const resetPreview = () => setPreviewKey((key) => key + 1);

  const handlePreviewSizeChange = (keys: Set<React.Key>) => {
    const [size] = keys;

    if (size === "desktop" || size === "phone" || size === "tablet") {
      setPreviewSize(size);
      previewPanelRef.current?.resize(previewWidths[size]);
    }
  };

  const Preview = item.Preview;

  return (
    <article className="scroll-mt-20" id={item.name}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      <Tabs
        className="not-prose"
        defaultSelectedKey="preview"
        onSelectionChange={(key) => {
          if (key === "code") setCodeEnabled(true);
        }}
      >
        <div className="flex items-center justify-between">
          <TabsList
            aria-label={`${item.title} view`}
            className="group-data-horizontal/tabs:h-fit p-1 gap-1 *:data-[slot=tabs-trigger]:size-7 *:data-[slot=tabs-trigger]:p-0 *:data-[slot=tabs-trigger]:[&_svg]:size-4 *:data-[slot=tabs-trigger]:transition-none"
          >
            <TabsTrigger id="preview">
              <EyeIcon />
              <span className="sr-only">Preview</span>
            </TabsTrigger>
            <TabsTrigger id="code">
              <CodeIcon />
              <span className="sr-only">Code</span>
            </TabsTrigger>
          </TabsList>
          <div
            aria-label="Preview controls"
            className="flex items-center gap-2 lg:pr-3"
            role="toolbar"
          >
            <ToggleGroup
              aria-label="Preview size"
              selectedKeys={previewSize ? [previewSize] : []}
              selectionMode="single"
              spacing={1}
              className="hidden lg:flex border p-0.75 transition-none *:data-[slot=toggle-group-item]:px-0 *:data-[slot=toggle-group-item]:[&_svg]:size-4! *:data-[slot=toggle-group-item]:transition-none"
              onSelectionChange={handlePreviewSizeChange}
            >
              <ToggleGroupItem aria-label="Phone preview" id="phone" size="sm">
                <SmartphoneIcon />
              </ToggleGroupItem>
              <ToggleGroupItem aria-label="Tablet preview" id="tablet" size="sm">
                <TabletIcon />
              </ToggleGroupItem>
              <ToggleGroupItem aria-label="Desktop preview" id="desktop" size="sm">
                <MonitorIcon />
              </ToggleGroupItem>
            </ToggleGroup>
            <LinkButton
              aria-label="Open preview in tab"
              className="transition-none"
              href={previewTheme ? `${item.previewHref}?theme=${previewTheme}` : item.previewHref}
              rel="noopener noreferrer"
              size="icon"
              target="_blank"
              variant="outline"
            >
              <ScanSquareIcon />
            </LinkButton>
            <RegistryPreviewThemeSwitch setTheme={setPreviewTheme} theme={previewTheme} />
            <ResetPreviewButton resetPreview={resetPreview} />
          </div>
        </div>
        <TabsContent id="preview">
          <ResizablePanelGroup
            disabled={isMobile}
            orientation="horizontal"
            onLayoutChanged={(_, { isUserInteraction }) => {
              if (isUserInteraction) setPreviewSize(null);
            }}
            className="min-h-64 rounded-lg bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] bg-size-[20px_20px]"
          >
            <ResizablePanel
              panelRef={previewPanelRef}
              defaultSize="100%"
              minSize={320}
              groupResizeBehavior={
                previewSize === "desktop" ? "preserve-relative-size" : "preserve-pixel-size"
              }
              className="rounded-lg"
            >
              <RegistryPreviewThemeBoundary
                className="flex size-full items-center justify-center rounded-lg border"
                theme={previewTheme}
              >
                <Preview key={previewKey} />
              </RegistryPreviewThemeBoundary>
            </ResizablePanel>
            <ResizableHandle className="hidden lg:flex w-3 cursor-col-resize bg-transparent after:absolute after:top-1/2 after:right-0 after:h-16 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-border after:transition-all" />
            <ResizablePanel defaultSize="0%" minSize="0%" />
          </ResizablePanelGroup>
        </TabsContent>
        <TabsContent
          id="code"
          className="min-h-64 flex items-center justify-center rounded-lg border bg-background"
        >
          {/* {codeEnabled ? <RegistryCodePanel enabled name={item.name} /> : null} */}
        </TabsContent>
      </Tabs>
    </article>
  );
}
