import type * as React from "react";
import { describe, expect, expectTypeOf, it } from "vite-plus/test";

import { getBadgeSize } from "@/components/badge/badge-state";
import {
  badgeVariants,
  type BadgeAnchorProps,
  type BadgeProps,
} from "@/components/badge/badge";

describe("badgeVariants", () => {
  it("uses the Material small badge defaults", () => {
    const classes = classSet(badgeVariants());

    expect(classes).toContain("size-1.5");
    expect(classes).toContain("rounded-[3px]");
    expect(classes).toContain("top-0");
    expect(classes).toContain("end-0");
    expect(classes).toContain("bg-[#b3261e]");
    expect(classes).toContain("dark:bg-[#f2b8b5]");
  });

  it("uses the Material large badge measurements and typography", () => {
    const classes = classSet(badgeVariants({ size: "large" }));

    expect(classes).toContain("h-4");
    expect(classes).toContain("min-w-4");
    expect(classes).toContain("max-w-[34px]");
    expect(classes).toContain("rounded-[8px]");
    expect(classes).toContain("px-1");
    expect(classes).toContain("text-[11px]");
    expect(classes).toContain("leading-4");
    expect(classes).toContain("font-medium");
    expect(classes).toContain("tracking-[0.5px]");
  });

  it("uses the Material large badge icon offset", () => {
    const classes = classSet(badgeVariants({ size: "large" }));

    expect(classes).toContain("-top-0.5");
    expect(classes).toContain("-end-1");
  });

  it("uses the Material on-error colors", () => {
    const classes = classSet(badgeVariants({ size: "large" }));

    expect(classes).toContain("text-white");
    expect(classes).toContain("dark:text-[#601410]");
  });

  it("allows consumer classes to override Material classes", () => {
    const classes = classSet(
      badgeVariants({
        className: "h-5 max-w-20 bg-fuchsia-700",
        size: "large",
      }),
    );

    expect(classes).toContain("h-5");
    expect(classes).toContain("max-w-20");
    expect(classes).toContain("bg-fuchsia-700");
    expect(classes).not.toContain("h-4");
    expect(classes).not.toContain("max-w-[34px]");
    expect(classes).not.toContain("bg-[#b3261e]");
  });
});

describe("getBadgeSize", () => {
  it.each([null, undefined, false, true])(
    "treats %s as an empty small badge",
    (children) => {
      expect(getBadgeSize(children)).toBe("small");
    },
  );

  it.each([0, 1, "New", "999+"])(
    "treats %s as large badge content",
    (children) => {
      expect(getBadgeSize(children)).toBe("large");
    },
  );
});

describe("badge component props", () => {
  it("accepts native span accessibility attributes and refs", () => {
    expectTypeOf<BadgeProps>().toEqualTypeOf<
      React.ComponentPropsWithRef<"span">
    >();
    expectTypeOf<BadgeAnchorProps>().toEqualTypeOf<
      React.ComponentPropsWithRef<"span">
    >();
  });
});

function classSet(className: string) {
  return new Set(className.split(/\s+/));
}
