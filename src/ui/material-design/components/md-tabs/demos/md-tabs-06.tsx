import {
  MDTab,
  MDTabList,
  MDTabs,
} from "@/ui/material-design/components/md-tabs/md-tabs";

const states = [
  { className: undefined, label: "Enabled" },
  { className: "before:opacity-[0.08]", label: "Hovered" },
  {
    className:
      "rounded-[20px] before:opacity-[0.1] outline-2 outline-solid outline-offset-[-4px] outline-[#6750a4] dark:outline-[#d0bcff]",
    label: "Focused",
  },
  { className: "before:opacity-[0.1]", label: "Pressed" },
] as const;

export default function MDTabsDemo() {
  return (
    <div className="grid w-full gap-8 md:grid-cols-2">
      {states.map((state) => (
        <div className="grid gap-2" key={state.label}>
          <p className="text-center text-sm font-medium text-muted-foreground">
            {state.label}
          </p>
          <MDTabs defaultSelectedKey="active" variant="secondary">
            <MDTabList
              aria-label={`Secondary inactive tab ${state.label.toLowerCase()} state`}
            >
              <MDTab id="active">Active</MDTab>
              <MDTab className={state.className} id="inactive">
                Inactive
              </MDTab>
            </MDTabList>
          </MDTabs>
        </div>
      ))}
    </div>
  );
}
