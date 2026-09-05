import {
  CodeIcon,
  EyeIcon,
  MonitorIcon,
  RotateCwIcon,
  ScanSquareIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { useState, type ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type RegistryCollectionItem = {
  description: string;
  name: string;
  Preview: ComponentType;
  title: string;
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
              defaultSelectedKeys={["desktop"]}
              selectionMode="single"
              spacing={1}
              className="hidden border p-0.75 transition-none *:data-[slot=toggle-group-item]:size-7! *:data-[slot=toggle-group-item]:px-0 *:data-[slot=toggle-group-item]:[&_svg]:size-4! *:data-[slot=toggle-group-item]:transition-none lg:flex"
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
            <Button
              aria-label="Reload preview"
              variant="outline"
              size="icon"
              className="transition-none"
            >
              <RotateCwIcon />
            </Button>
          </div>
        </div>
        <TabsContent
          id="preview"
          className="min-h-64 flex items-center justify-center rounded-lg border bg-background"
        >
          <Preview />
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
