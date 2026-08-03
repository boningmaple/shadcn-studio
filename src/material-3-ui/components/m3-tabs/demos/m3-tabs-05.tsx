import {
  M3Tab,
  M3TabList,
  M3Tabs,
} from "@/material-3-ui/components/m3-tabs/m3-tabs";

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

export default function M3TabsDemo() {
  return (
    <div className="grid w-full gap-8 md:grid-cols-2">
      {states.map((state) => (
        <div className="grid gap-2" key={state.label}>
          <p className="text-center text-sm font-medium text-muted-foreground">
            {state.label}
          </p>
          <M3Tabs defaultSelectedKey="active" variant="secondary">
            <M3TabList
              aria-label={`Secondary active tab ${state.label.toLowerCase()} state`}
            >
              <M3Tab className={state.className} id="active">
                Active
              </M3Tab>
              <M3Tab id="inactive">Inactive</M3Tab>
            </M3TabList>
          </M3Tabs>
        </div>
      ))}
    </div>
  );
}
