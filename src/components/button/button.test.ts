import { describe, expect, it } from "vite-plus/test";

import { buttonVariants } from "@/components/button/button";

describe("buttonVariants", () => {
  it("uses the filled small round defaults", () => {
    const classes = classSet(buttonVariants());

    expect(classes).toContain("bg-[#6750a4]");
    expect(classes).toContain("dark:bg-[#d0bcff]");
    expect(classes).toContain("h-10");
    expect(classes).toContain("rounded-full");
  });

  it("uses a solid outline style for focus-visible buttons", () => {
    const classes = classSet(buttonVariants());

    expect(classes).toContain("data-focus-visible:outline-solid");
  });

  it("transitions the focus-visible outline without custom keyframes", () => {
    const classes = classSet(buttonVariants());

    expect(classes).toContain(
      "transition-[background-color,border-color,border-radius,box-shadow,color,outline-color,outline-offset,outline-width]",
    );
    expect(classes).toContain("outline-0");
    expect(classes).toContain("outline-offset-0");
    expect(classes).toContain("outline-transparent");
    expect(classes).toContain("data-focus-visible:duration-600");
    expect(classes).toContain(
      "data-focus-visible:ease-[linear(0,2_25%,1_100%)]",
    );
  });

  it.each([
    ["elevated", "bg-[#f7f2fa]"],
    ["filled", "bg-[#6750a4]"],
    ["tonal", "bg-[#e8def8]"],
    ["outlined", "border-[#cac4d0]"],
    ["text", "text-[#6750a4]"],
  ] as const)("applies the %s color style", (variant, expectedClass) => {
    expect(classSet(buttonVariants({ variant }))).toContain(expectedClass);
  });

  it.each([
    ["elevated", true],
    ["filled", true],
    ["tonal", true],
    ["outlined", false],
    ["text", false],
  ] as const)(
    "applies the %s disabled colors",
    (variant, hasDisabledContainer) => {
      const classes = classSet(buttonVariants({ variant }));

      expect(classes).toContain("data-disabled:text-[#1D1B20]/38");
      expect(classes).toContain("dark:data-disabled:text-[#E6E0E9]/38");

      if (hasDisabledContainer) {
        expect(classes).toContain("data-disabled:bg-[#1D1B20]/10");
        expect(classes).toContain("dark:data-disabled:bg-[#E6E0E9]/10");
      }
    },
  );

  it("applies opacity-based disabled colors to the outlined border", () => {
    const classes = classSet(buttonVariants({ variant: "outlined" }));

    expect(classes).toContain("data-disabled:border-[#1D1B20]/12");
    expect(classes).toContain("dark:data-disabled:border-[#E6E0E9]/12");
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
      const classes = classSet(buttonVariants({ size }));

      expect(classes).toContain(height);
      expect(classes).toContain(padding);
      expect(classes).toContain(pressedShape);
      expect(
        [...classes].some((className) => className.endsWith(`:${svgSize}`)),
      ).toBe(true);
    },
  );

  it.each([
    ["xs", "rounded-[12px]"],
    ["sm", "rounded-[12px]"],
    ["md", "rounded-[16px]"],
    ["lg", "rounded-[28px]"],
    ["xl", "rounded-[28px]"],
  ] as const)("applies the %s square shape", (size, expectedClass) => {
    expect(classSet(buttonVariants({ shape: "square", size }))).toContain(
      expectedClass,
    );
  });

  it("allows consumer classes to override variant classes", () => {
    const classes = classSet(
      buttonVariants({ className: "h-20 px-9", size: "sm" }),
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
