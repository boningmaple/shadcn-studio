import type { VibeBuiltRegistryItem } from "../types/registry.ts";
import { PreviewBlock } from "./preview-block";

type RegistryCollectionPageProps = {
  description: string;
  items: VibeBuiltRegistryItem[];
  title: string;
};

export function RegistryCollectionPage(props: RegistryCollectionPageProps) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.description}</p>

      {props.items.map((item) => (
        <PreviewBlock key={item.name} item={item} />
      ))}
    </>
  );
}
