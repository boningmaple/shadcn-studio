import { describe, expect, it } from "vite-plus/test";

import { toggleButtonVariants } from "@/components/button/toggle-button";

describe("toggleButtonVariants", () => {
  it("uses the filled small round defaults", () => {
    const classes = classSet(toggleButtonVariants());

    expect(classes).toContain("bg-[#f3edf7]");
    expect(classes).toContain("dark:bg-[#211f26]");
    expect(classes).toContain("h-10");
    expect(classes).toContain("rounded-full");
  });

  it("uses a solid Material focus-visible outline", () => {
    const classes = classSet(toggleButtonVariants());

    expect(classes).toContain("data-focus-visible:outline-solid");
    expect(classes).toContain("data-focus-visible:outline-[#6750a4]");
    expect(classes).toContain("dark:data-focus-visible:outline-[#d0bcff]");
  });

  it.each([
    [
      "elevated",
      "bg-[#f7f2fa]",
      "text-[#6750a4]",
      "data-selected:bg-[#6750a4]",
      "data-selected:text-white",
      "dark:bg-[#1d1b20]",
      "dark:data-selected:bg-[#d0bcff]",
    ],
    [
      "filled",
      "bg-[#f3edf7]",
      "text-[#49454f]",
      "data-selected:bg-[#6750a4]",
      "data-selected:text-white",
      "dark:bg-[#211f26]",
      "dark:data-selected:bg-[#d0bcff]",
    ],
    [
      "tonal",
      "bg-[#e8def8]",
      "text-[#1d192b]",
      "data-selected:bg-[#625b71]",
      "data-selected:text-white",
      "dark:bg-[#4a4458]",
      "dark:data-selected:bg-[#ccc2dc]",
    ],
    [
      "outlined",
      "border-[#cac4d0]",
      "text-[#49454f]",
      "data-selected:bg-[#322f35]",
      "data-selected:text-[#f5eff7]",
      "dark:border-[#49454f]",
      "dark:data-selected:bg-[#e6e0e9]",
    ],
  ] as const)(
    "applies the %s unselected and selected colors",
    (
      variant,
      unselectedContainer,
      unselectedLabel,
      selectedContainer,
      selectedLabel,
      darkUnselectedContainer,
      darkSelectedContainer,
    ) => {
      const classes = classSet(toggleButtonVariants({ variant }));

      expect(classes).toContain(unselectedContainer);
      expect(classes).toContain(unselectedLabel);
      expect(classes).toContain(selectedContainer);
      expect(classes).toContain(selectedLabel);
      expect(classes).toContain(darkUnselectedContainer);
      expect(classes).toContain(darkSelectedContainer);
    },
  );

  it("uses the dark selected label colors", () => {
    expect(classSet(toggleButtonVariants({ variant: "elevated" }))).toContain(
      "dark:data-selected:text-[#381e72]",
    );
    expect(classSet(toggleButtonVariants({ variant: "filled" }))).toContain(
      "dark:data-selected:text-[#381e72]",
    );
    expect(classSet(toggleButtonVariants({ variant: "tonal" }))).toContain(
      "dark:data-selected:text-[#332d41]",
    );
    expect(classSet(toggleButtonVariants({ variant: "outlined" }))).toContain(
      "dark:data-selected:text-[#322f35]",
    );
  });

  it("keeps disabled colors authoritative when selected", () => {
    const classes = classSet(toggleButtonVariants());

    expect(classes).toContain("data-selected:data-disabled:bg-[#1D1B20]/10");
    expect(classes).toContain("data-selected:data-disabled:text-[#1D1B20]/38");
    expect(classes).toContain(
      "dark:data-selected:data-disabled:bg-[#E6E0E9]/10",
    );
    expect(classes).toContain(
      "dark:data-selected:data-disabled:text-[#E6E0E9]/38",
    );
  });

  it("removes the outlined border when selected", () => {
    const classes = classSet(toggleButtonVariants({ variant: "outlined" }));

    expect(classes).toContain("data-selected:border-transparent");
    expect(classes).toContain("dark:data-selected:border-transparent");
    expect(classes).toContain("data-selected:data-disabled:border-transparent");
  });

  it.each([
    ["xs", "h-8", "px-3", "data-pressed:rounded-[8px]", "size-5"],
    ["sm", "h-10", "px-4", "data-pressed:rounded-[8px]", "size-5"],
    ["md", "h-14", "px-6", "data-pressed:rounded-[12px]", "size-6"],
    ["lg", "h-24", "px-12", "data-pressed:rounded-[16px]", "size-8"],
    ["xl", "h-34", "px-16", "data-pressed:rounded-[16px]", "size-10"],
  ] as const)(
    "applies the %s measurements",
    (size, height, padding, pressedShape, svgSize) => {
      const classes = classSet(toggleButtonVariants({ size }));

      expect(classes).toContain(height);
      expect(classes).toContain(padding);
      expect(classes).toContain(pressedShape);
      expect(
        [...classes].some((className) => className.endsWith(`:${svgSize}`)),
      ).toBe(true);
    },
  );

  it.each([
    ["xs", "data-selected:rounded-[12px]"],
    ["sm", "data-selected:rounded-[12px]"],
    ["md", "data-selected:rounded-[16px]"],
    ["lg", "data-selected:rounded-[28px]"],
    ["xl", "data-selected:rounded-[28px]"],
  ] as const)(
    "morphs a round %s toggle to the square radius when selected",
    (size, selectedShape) => {
      const classes = classSet(toggleButtonVariants({ shape: "round", size }));

      expect(classes).toContain("rounded-full");
      expect(classes).toContain(selectedShape);
    },
  );

  it.each([
    ["xs", "rounded-[12px]"],
    ["sm", "rounded-[12px]"],
    ["md", "rounded-[16px]"],
    ["lg", "rounded-[28px]"],
    ["xl", "rounded-[28px]"],
  ] as const)(
    "morphs a square %s toggle to round when selected",
    (size, unselectedShape) => {
      const classes = classSet(toggleButtonVariants({ shape: "square", size }));

      expect(classes).toContain(unselectedShape);
      expect(classes).toContain("data-selected:rounded-full");
    },
  );

  it.each([
    ["xs", "data-selected:data-pressed:rounded-[8px]"],
    ["sm", "data-selected:data-pressed:rounded-[8px]"],
    ["md", "data-selected:data-pressed:rounded-[12px]"],
    ["lg", "data-selected:data-pressed:rounded-[16px]"],
    ["xl", "data-selected:data-pressed:rounded-[16px]"],
  ] as const)(
    "keeps the %s pressed radius authoritative when selected",
    (size, selectedPressedShape) => {
      expect(classSet(toggleButtonVariants({ size }))).toContain(
        selectedPressedShape,
      );
    },
  );

  it("allows consumer classes to override variant classes", () => {
    const classes = classSet(
      toggleButtonVariants({
        className: "h-20 px-9",
        size: "sm",
      }),
    );

    expect(classes).toContain("h-20");
    expect(classes).toContain("px-9");
    expect(classes).not.toContain("h-10");
    expect(classes).not.toContain("px-4");
  });
});

function classSet(className: string) {
  return new Set(className.split(/\s+/));
}
