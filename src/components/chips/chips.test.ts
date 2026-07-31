import { describe, expect, it } from "vite-plus/test";

import { chipVariants } from "@/components/chips/chips";

describe("chipVariants", () => {
  it("uses the assist outlined defaults", () => {
    const styles = chipVariants();

    expect(classSet(styles.group())).toContain("block");
    expect(classSet(styles.surface())).toContain("h-8");
    expect(classSet(styles.surface())).toContain("rounded-[8px]");
    expect(classSet(styles.surface())).toContain("border-[#79747e]");
    expect(classSet(styles.surface())).toContain("text-[#1d1b20]");
    expect(classSet(styles.icon())).toContain("text-[#6750a4]");
  });

  it("keeps a 32px surface within a 48px interaction target", () => {
    const styles = chipVariants();

    expect(classSet(styles.item())).toContain("min-h-12");
    expect(classSet(styles.item())).toContain("min-w-12");
    expect(classSet(styles.surface())).toContain("h-8");
  });

  it("uses Material icon sizing and padding", () => {
    const styles = chipVariants();

    expect(classSet(styles.surface())).toContain("gap-2");
    expect(classSet(styles.surface())).toContain("ps-4");
    expect(classSet(styles.surface())).toContain("pe-4");
    expect(classSet(styles.surface())).toContain(
      "has-[>[data-slot=chip-icon]]:ps-2",
    );
    expect(classSet(styles.icon())).toContain("size-[18px]");
    expect(classSet(styles.selectionIndicator())).toContain("size-[18px]");
  });

  it("wraps chip sets with Material spacing", () => {
    const classes = classSet(chipVariants().list());

    expect(classes).toContain("flex-wrap");
    expect(classes).toContain("gap-x-2");
    expect(classes).toContain("gap-y-0");
  });

  it("applies filter selected colors and styles its automatic indicator", () => {
    const styles = chipVariants({ variant: "filter" });
    const surface = classSet(styles.surface());

    expect(surface).toContain("text-[#49454f]");
    expect(surface).toContain("group-data-selected/chip:bg-[#e8def8]");
    expect(surface).toContain("group-data-selected/chip:text-[#1d192b]");
    expect(surface).toContain("dark:group-data-selected/chip:bg-[#4a4458]");
    expect(classSet(styles.selectionIndicator())).toContain("size-[18px]");
    expect(classSet(styles.selectionIndicator())).toContain("text-[#1d192b]");
  });

  it("uses suggestion on-surface-variant colors", () => {
    const styles = chipVariants({ variant: "suggestion" });

    expect(classSet(styles.surface())).toContain("text-[#49454f]");
    expect(classSet(styles.surface())).toContain("dark:text-[#cac4d0]");
    expect(classSet(styles.icon())).toContain("text-[#49454f]");
  });

  it("uses Material state layers and the project focus ring", () => {
    const classes = classSet(chipVariants().surface());

    expect(classes).toContain("group-data-hovered/chip:before:opacity-[0.08]");
    expect(classes).toContain(
      "group-data-focus-visible/chip:before:opacity-[0.1]",
    );
    expect(classes).toContain("group-data-pressed/chip:before:opacity-[0.1]");
    expect(classes).toContain("group-data-focus-visible/chip:outline-2");
    expect(classes).toContain(
      "group-data-focus-visible/chip:outline-[#6750a4]",
    );
    expect(classes).toContain(
      "dark:group-data-focus-visible/chip:outline-[#d0bcff]",
    );
  });

  it("keeps disabled colors authoritative", () => {
    const outlined = classSet(chipVariants().surface());
    const filter = classSet(chipVariants({ variant: "filter" }).surface());

    expect(outlined).toContain("group-data-disabled/chip:text-[#1D1B20]/38");
    expect(outlined).toContain("group-data-disabled/chip:border-[#1D1B20]/12");
    expect(filter).toContain(
      "group-data-selected/chip:group-data-disabled/chip:bg-[#1D1B20]/12",
    );
  });

  it("applies elevated containers and Material elevations", () => {
    const classes = classSet(chipVariants({ surface: "elevated" }).surface());

    expect(classes).toContain("bg-[#f7f2fa]");
    expect(classes).toContain("dark:bg-[#1d1b20]");
    expect(classes).toContain(
      "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
    );
    expect(classes).toContain(
      "group-data-hovered/chip:shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]",
    );
    expect(classes).toContain("group-data-disabled/chip:shadow-none");
  });

  it("disables transitions for reduced motion", () => {
    const classes = classSet(chipVariants().surface());

    expect(classes).toContain("motion-reduce:transition-none");
    expect(classes).toContain("motion-reduce:before:transition-none");
  });

  it("allows consumer classes to override slot classes", () => {
    const styles = chipVariants();
    const surface = classSet(styles.surface({ className: "h-10 px-6" }));
    const list = classSet(styles.list({ className: "gap-x-4" }));

    expect(surface).toContain("h-10");
    expect(surface).toContain("px-6");
    expect(surface).not.toContain("h-8");
    expect(list).toContain("gap-x-4");
    expect(list).not.toContain("gap-x-2");
  });
});

function classSet(className: string) {
  return new Set(className.split(/\s+/));
}
