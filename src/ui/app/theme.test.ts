import { describe, expect, it } from "vite-plus/test";

import { getNextTheme, parseTheme, themeSchema, themes } from "./theme";

describe("theme", () => {
  it("cycles from system to light to dark and back to system", () => {
    expect(getNextTheme("system")).toBe("light");
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("dark")).toBe("system");
  });

  it.each(themes)("accepts the %s theme", (theme) => {
    expect(themeSchema.parse(theme)).toBe(theme);
    expect(parseTheme(theme)).toBe(theme);
  });

  it.each([undefined, null, "", "auto", "sepia", {}, []])(
    "falls back to system for an invalid stored value: %j",
    (value) => {
      expect(parseTheme(value)).toBe("system");
    },
  );
});
