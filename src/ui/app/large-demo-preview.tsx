import * as React from "react";
import {
  Code2Icon,
  ExternalLinkIcon,
  EyeIcon,
  LoaderCircleIcon,
  MonitorIcon,
  MoonIcon,
  RefreshCwIcon,
  SmartphoneIcon,
  SunIcon,
  TabletIcon,
} from "lucide-react";

import { demoAnchorId, type ComponentEntry, type Demo } from "@/registry";
import { HighlightedCode, useComponentCode } from "@/ui/app/component-code";
import {
  getStandaloneDemoHref,
  type DemoPreviewTheme,
} from "@/ui/app/demo-preview";
import { Button, buttonVariants } from "@/ui/shadcn/react-aria/button";
import { ScrollArea } from "@/ui/shadcn/react-aria/scroll-area";
import { Separator } from "@/ui/shadcn/react-aria/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/ui/shadcn/react-aria/toggle-group";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";
import { cn } from "@/lib/utils";

type LargeDemoPreviewProps = {
  component: ComponentEntry;
  demo: Demo;
  isMarked: boolean;
  preview: React.ComponentType;
};

type DemoView = "preview" | "code";
type PreviewSize = "mobile" | "tablet" | "desktop";

const previewWidths: Record<PreviewSize, string> = {
  mobile: "390px",
  tablet: "768px",
  desktop: "100%",
};

export function LargeDemoPreview({
  component,
  demo,
  isMarked,
  preview: Preview,
}: LargeDemoPreviewProps) {
  const [view, setView] = React.useState<DemoView>("preview");
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>("desktop");
  const [demoTheme, setDemoTheme] = React.useState<DemoPreviewTheme>("light");
  const [refreshKey, setRefreshKey] = React.useState(0);
  const { codeState, loadCode } = useComponentCode(component, demo);
  const anchorId = demoAnchorId(component, demo);

  React.useEffect(() => {
    setDemoTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  React.useEffect(() => {
    if (view === "code") {
      void loadCode();
    }
  }, [loadCode, view]);

  function selectView(nextView: DemoView) {
    setView(nextView);
  }

  function selectPreviewSize(nextPreviewSize: PreviewSize) {
    setPreviewSize(nextPreviewSize);
    setView("preview");
  }

  function refreshPreview() {
    setRefreshKey((current) => current + 1);
    setView("preview");
  }

  function toggleDemoTheme() {
    setDemoTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <article
      aria-label={demo.name}
      className={cn(
        "scroll-mt-20 border-r border-b border-dashed p-3 transition-colors duration-700 sm:col-span-2 sm:p-4 lg:col-span-3",
        "data-[marked=true]:bg-primary/8 data-[marked=true]:inset-ring-2 data-[marked=true]:inset-ring-ring/60 data-[marked=true]:duration-150",
      )}
      data-demo-theme={demoTheme}
      data-marked={isMarked}
      data-preview-size={previewSize}
      data-view={view}
      id={anchorId}
    >
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-xs">
        <header className="flex min-h-[3.25rem] items-center justify-between gap-3 border-b bg-muted/45 px-2 py-2 sm:px-3">
          <ToggleGroup
            aria-label={`${demo.name} view`}
            onSelectionChange={(keys) => {
              const nextView = getSelectedKey(keys);
              if (nextView === "preview" || nextView === "code") {
                selectView(nextView);
              }
            }}
            selectedKeys={[view]}
            selectionMode="single"
            size="sm"
            spacing={0}
            variant="outline"
          >
            <ToolbarToggleItem
              label="Show preview"
              onPress={() => selectView("preview")}
              value="preview"
            >
              <EyeIcon />
            </ToolbarToggleItem>
            <ToolbarToggleItem
              label="Show code"
              onPress={() => selectView("code")}
              value="code"
            >
              <Code2Icon />
            </ToolbarToggleItem>
          </ToggleGroup>

          <div className="flex min-w-0 items-center justify-end gap-1">
            <div className="hidden items-center gap-1 lg:flex">
              <ToggleGroup
                aria-label={`${demo.name} preview size`}
                onSelectionChange={(keys) => {
                  const nextPreviewSize = getSelectedKey(keys);
                  if (
                    nextPreviewSize === "mobile" ||
                    nextPreviewSize === "tablet" ||
                    nextPreviewSize === "desktop"
                  ) {
                    selectPreviewSize(nextPreviewSize);
                  }
                }}
                selectedKeys={[previewSize]}
                selectionMode="single"
                size="sm"
                spacing={0}
                variant="outline"
              >
                <ToolbarToggleItem
                  label="Mobile preview"
                  onPress={() => selectPreviewSize("mobile")}
                  value="mobile"
                >
                  <SmartphoneIcon />
                </ToolbarToggleItem>
                <ToolbarToggleItem
                  label="Tablet preview"
                  onPress={() => selectPreviewSize("tablet")}
                  value="tablet"
                >
                  <TabletIcon />
                </ToolbarToggleItem>
                <ToolbarToggleItem
                  label="Desktop preview"
                  onPress={() => selectPreviewSize("desktop")}
                  value="desktop"
                >
                  <MonitorIcon />
                </ToolbarToggleItem>
              </ToggleGroup>
              <Separator orientation="vertical" className="mx-1 h-5" />
            </div>

            <IconButtonWithTooltip
              label={
                demoTheme === "dark"
                  ? "Switch demo to light theme"
                  : "Switch demo to dark theme"
              }
              onPress={toggleDemoTheme}
            >
              {demoTheme === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButtonWithTooltip>
            <IconButtonWithTooltip
              label="Refresh preview"
              onPress={refreshPreview}
            >
              <RefreshCwIcon />
            </IconButtonWithTooltip>
            <TooltipTrigger delay={300}>
              <a
                aria-label={`Open ${demo.name} in a new tab`}
                className={buttonVariants({
                  className: "text-muted-foreground",
                  size: "icon-sm",
                  variant: "outline",
                })}
                href={getStandaloneDemoHref({
                  component,
                  demo,
                  theme: demoTheme,
                })}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLinkIcon />
              </a>
              <Tooltip>Open in new tab</Tooltip>
            </TooltipTrigger>
          </div>
        </header>

        {view === "preview" ? (
          <PreviewStage
            Preview={Preview}
            previewSize={previewSize}
            refreshKey={refreshKey}
            theme={demoTheme}
          />
        ) : (
          <CodeStage codeState={codeState} loadCode={loadCode} />
        )}
      </div>
    </article>
  );
}

function PreviewStage({
  Preview,
  previewSize,
  refreshKey,
  theme,
}: {
  Preview: React.ComponentType;
  previewSize: PreviewSize;
  refreshKey: number;
  theme: DemoPreviewTheme;
}) {
  return (
    <div className="flex min-h-[30rem] items-center justify-center overflow-auto bg-muted/20 p-4 sm:p-8">
      <div
        className={cn(
          "max-w-full resize-x overflow-auto rounded-lg border bg-background text-foreground shadow-sm",
          theme === "dark" ? "dark" : "light",
        )}
        style={{
          colorScheme: theme,
          minWidth: "320px",
          width: previewWidths[previewSize],
        }}
      >
        <div
          className="flex min-h-[24rem] w-full items-center justify-center p-6"
          key={refreshKey}
        >
          <Preview />
        </div>
      </div>
    </div>
  );
}

function CodeStage({
  codeState,
  loadCode,
}: {
  codeState: ReturnType<typeof useComponentCode>["codeState"];
  loadCode: ReturnType<typeof useComponentCode>["loadCode"];
}) {
  return (
    <div className="min-h-[30rem] bg-muted/20 p-3 sm:p-4">
      {codeState.status === "success" ? (
        <ScrollArea className="max-h-[38rem] rounded-md border bg-card">
          <HighlightedCode
            className="rounded-none border-0 [&_.shiki]:min-h-[30rem]"
            html={codeState.payload.html}
          />
        </ScrollArea>
      ) : codeState.status === "error" ? (
        <div
          className="flex min-h-[30rem] flex-col items-center justify-center gap-4 rounded-md border bg-card p-6 text-center"
          role="alert"
        >
          <p className="text-sm text-muted-foreground">
            The code example could not be loaded.
          </p>
          <Button onPress={loadCode} variant="outline">
            Try again
          </Button>
        </div>
      ) : (
        <div
          className="flex min-h-[30rem] items-center justify-center gap-2 rounded-md border bg-card text-sm text-muted-foreground"
          role="status"
        >
          <LoaderCircleIcon className="animate-spin" />
          Loading code
        </div>
      )}
    </div>
  );
}

function ToolbarToggleItem({
  children,
  label,
  onPress,
  value,
}: {
  children: React.ReactNode;
  label: string;
  onPress: () => void;
  value: string;
}) {
  return (
    <ToggleGroupItem aria-label={label} id={value} onPress={onPress}>
      {children}
    </ToggleGroupItem>
  );
}

function getSelectedKey(selection: unknown): string | undefined {
  if (selection instanceof Set) {
    const [key] = [...selection];
    return key === undefined ? undefined : String(key);
  }

  return typeof selection === "string" || typeof selection === "number"
    ? String(selection)
    : undefined;
}

function IconButtonWithTooltip({
  children,
  label,
  onPress,
}: {
  children: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TooltipTrigger delay={300}>
      <Button
        aria-label={label}
        className="text-muted-foreground"
        onPress={onPress}
        size="icon-sm"
        variant="outline"
      >
        {children}
      </Button>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}
