import { describe, expect, it } from "vite-plus/test";

import { tabsVariants } from "@/components/tabs/tabs";

describe("tabsVariants", () => {
  it("uses the primary horizontal defaults", () => {
    const styles = tabsVariants();

    expect(classSet(styles.root())).toContain("block");
    expect(classSet(styles.list())).toContain("border-b");
    expect(classSet(styles.tab())).toContain("h-12");
    expect(classSet(styles.tab())).toContain("data-selected:text-[#6750a4]");
    expect(classSet(styles.indicator())).toContain("h-[3px]");
  });

  it("applies the secondary selected colors and full-width indicator", () => {
    const styles = tabsVariants({ variant: "secondary" });

    expect(classSet(styles.tab())).toContain("data-selected:text-[#1d1b20]");
    expect(classSet(styles.tab())).toContain(
      "dark:data-selected:text-[#e6e0e9]",
    );
    expect(classSet(styles.content())).toContain("w-full");
    expect(classSet(styles.indicator())).toContain("h-0.5");
    expect(classSet(styles.indicator())).toContain("w-full");
  });

  it("uses Material measurements for primary icon tabs", () => {
    const styles = tabsVariants();

    expect(classSet(styles.tab())).toContain("has-[svg]:h-16");
    expect(classSet(styles.tab())).toContain("[&_svg]:size-6");
    expect(classSet(styles.list())).toContain("border-b");
    expect(classSet(styles.indicator())).toContain("min-w-6");
  });

  it("includes Material interaction and disabled states", () => {
    const classes = classSet(tabsVariants().tab());

    expect(classes).toContain("data-hovered:before:opacity-[0.08]");
    expect(classes).toContain("data-focus-visible:before:opacity-[0.1]");
    expect(classes).toContain("data-focus-visible:rounded-[20px]");
    expect(classes).toContain("data-focus-visible:outline-2");
    expect(classes).toContain("data-focus-visible:outline-solid");
    expect(classes).toContain("data-focus-visible:outline-offset-[-4px]");
    expect(classes).toContain("data-focus-visible:outline-[#6750a4]");
    expect(classes).toContain("dark:data-focus-visible:outline-[#d0bcff]");
    expect(classes).toContain("data-pressed:before:opacity-[0.1]");
    expect(classes).toContain("data-disabled:text-[#1D1B20]/38");
    expect(classes).toContain("data-selected:data-disabled:text-[#1D1B20]/38");
  });

  it("transposes the tab list and indicators vertically", () => {
    const primary = tabsVariants({ orientation: "vertical" });
    const secondary = tabsVariants({
      orientation: "vertical",
      variant: "secondary",
    });

    expect(classSet(primary.root())).toContain("flex");
    expect(classSet(primary.list())).toContain("border-r");
    expect(classSet(primary.list())).toContain("flex-col");
    expect(classSet(primary.indicator())).toContain("w-[3px]");
    expect(classSet(primary.indicator())).toContain("min-h-6");
    expect(classSet(secondary.indicator())).toContain("h-full");
    expect(classSet(secondary.indicator())).toContain("w-0.5");
  });

  it("keeps disabled indicator colors authoritative", () => {
    const classes = classSet(tabsVariants().indicator());

    expect(classes).toContain("group-data-disabled/tab:bg-[#1D1B20]/38");
    expect(classes).toContain("dark:group-data-disabled/tab:bg-[#E6E0E9]/38");
  });

  it("allows consumer classes to override slot classes", () => {
    const styles = tabsVariants();
    const classes = classSet(styles.tab({ className: "h-20 px-8" }));

    expect(classes).toContain("h-20");
    expect(classes).toContain("px-8");
    expect(classes).not.toContain("h-12");
    expect(classes).not.toContain("px-4");
  });
});

function classSet(className: string) {
  return new Set(className.split(/\s+/));
}
