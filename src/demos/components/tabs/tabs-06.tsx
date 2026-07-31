import { Tab, TabList, Tabs } from "@/components/tabs/tabs";

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

export default function TabsDemo() {
  return (
    <div className="grid w-full gap-8 md:grid-cols-2">
      {states.map((state) => (
        <div className="grid gap-2" key={state.label}>
          <p className="text-center text-sm font-medium text-muted-foreground">
            {state.label}
          </p>
          <Tabs defaultSelectedKey="active" variant="secondary">
            <TabList
              aria-label={`Secondary inactive tab ${state.label.toLowerCase()} state`}
            >
              <Tab id="active">Active</Tab>
              <Tab className={state.className} id="inactive">
                Inactive
              </Tab>
            </TabList>
          </Tabs>
        </div>
      ))}
    </div>
  );
}
