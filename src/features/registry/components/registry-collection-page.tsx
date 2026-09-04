import { useState, type ComponentType } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RegistryCodePanel } from "./registry-code-panel";
import { RegistryItemPreview } from "./registry-preview-page";

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
    <div className="w-full prose dark:prose-invert">
      <h1>{title}</h1>
      <p>{description}</p>

      {items.map((item) => (
        <RegistryItemShowcase item={item} key={item.name} />
      ))}
    </div>
  );
}

function RegistryItemShowcase({ item }: { item: RegistryCollectionItem }) {
  const [codeEnabled, setCodeEnabled] = useState(false);
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
        <TabsList aria-label={`${item.title} view`}>
          <TabsTrigger id="preview">Preview</TabsTrigger>
          <TabsTrigger id="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent id="preview">
          <div className="min-h-136 overflow-hidden rounded-lg border bg-background">
            <RegistryItemPreview embedded preview={<Preview />} />
          </div>
        </TabsContent>
        <TabsContent id="code">
          {codeEnabled ? <RegistryCodePanel enabled name={item.name} /> : null}
        </TabsContent>
      </Tabs>
    </article>
  );
}
