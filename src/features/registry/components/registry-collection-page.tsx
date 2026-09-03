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
  eyebrow,
  items,
  title,
}: {
  description: string;
  eyebrow: string;
  items: RegistryCollectionItem[];
  title: string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 py-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </header>

      <div className="space-y-16">
        {items.map((item) => (
          <RegistryItemShowcase item={item} key={item.name} />
        ))}
      </div>
    </div>
  );
}

function RegistryItemShowcase({ item }: { item: RegistryCollectionItem }) {
  const [codeEnabled, setCodeEnabled] = useState(false);
  const Preview = item.Preview;

  return (
    <article className="scroll-mt-20 space-y-5" id={item.name}>
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
        <p className="text-muted-foreground">{item.description}</p>
      </header>

      <Tabs
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
