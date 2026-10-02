import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import { applyResolvedThemeToDocument } from "@/features/theme-switch/lib/apply-theme";

import { resetMessage, themeDarkMessage, themeLightMessage } from "../lib/preview-frame-message";
import type { VibeRegistrySectionName } from "../types/registry";

type PreviewPageProps = {
  Preview: ComponentType;
  section: VibeRegistrySectionName;
};

export function PreviewPage(props: PreviewPageProps) {
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== location.origin || event.source !== parent) return;

      if (event.data === resetMessage) {
        setPreviewKey((key) => key + 1);
        return;
      }

      if (event.data === themeLightMessage) {
        applyResolvedThemeToDocument("light");
        return;
      }

      if (event.data === themeDarkMessage) {
        applyResolvedThemeToDocument("dark");
      }
    };

    addEventListener("message", onMessage);
    return () => removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      className={
        props.section !== "pages"
          ? "flex min-h-svh items-center justify-center p-4"
          : "min-h-svh w-full"
      }
    >
      <props.Preview key={previewKey} />
    </div>
  );
}
