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

import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import ResetPreviewButton from "./reset-preview-button";

export type RegistryCollectionItem = {
  description: string;
  name: string;
  Preview: ComponentType;
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
  const [, setCodeEnabled] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [previewSize, setPreviewSize] = useState<PreviewSize | null>("desktop");
  const previewPanelRef = usePanelRef();
  const resetPreview = () => setPreviewKey((key) => key + 1);

  const resizePreview = (size: PreviewSize) => {
    setPreviewSize(size);
    previewPanelRef.current?.resize(previewWidths[size]);
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
          <div aria-label="Preview controls" className="flex items-center gap-2" role="toolbar">
            <ToggleGroup
              aria-label="Preview size"
              selectedKeys={previewSize ? [previewSize] : []}
              selectionMode="single"
              spacing={1}
              className="hidden border p-0.75 transition-none *:data-[slot=toggle-group-item]:size-7! *:data-[slot=toggle-group-item]:px-0 *:data-[slot=toggle-group-item]:[&_svg]:size-4! *:data-[slot=toggle-group-item]:transition-none lg:flex"
              onSelectionChange={(keys) => {
                const [size] = keys;

                if (size === "desktop" || size === "phone" || size === "tablet") {
                  resizePreview(size);
                }
              }}
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
            <Button
              aria-label="Open preview fullscreen"
              variant="outline"
              size="icon"
              className="transition-none"
            >
              <ScanSquareIcon />
            </Button>
            <ResetPreviewButton resetPreview={resetPreview} />
          </div>
        </div>
        <TabsContent id="preview" className="min-h-64 overflow-hidden rounded-lg">
          <ResizablePanelGroup
            className="min-h-64"
            onLayoutChanged={(_, { isUserInteraction }) => {
              if (isUserInteraction) setPreviewSize(null);
            }}
            orientation="horizontal"
          >
            <ResizablePanel
              className="flex items-center justify-center rounded-lg border bg-background"
              defaultSize="100%"
              groupResizeBehavior={
                previewSize === "desktop" ? "preserve-relative-size" : "preserve-pixel-size"
              }
              minSize={320}
              panelRef={previewPanelRef}
            >
              <Preview key={previewKey} />
            </ResizablePanel>
            <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-border after:transition-all after:hover:h-10 lg:flex" />
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
