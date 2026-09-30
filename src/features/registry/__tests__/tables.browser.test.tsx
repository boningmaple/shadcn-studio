import { describe, expect, it } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import Table01 from "@/registry/vibe-ui/table-01/table-01";
import Table02 from "@/registry/vibe-ui/table-02/table-02";
import Table03 from "@/registry/vibe-ui/table-03/table-03";
import Table04 from "@/registry/vibe-ui/table-04/table-04";

const nextPage = () => page.getByRole("button", { name: "Next page" });
const previousPage = () => page.getByRole("button", { name: "Previous page" });
const resultCount = () => page.getByRole("status").filter({ hasText: /of \d+|0 results/ });

async function clickCheckbox(name: string) {
  const checkbox = page.getByRole("checkbox", { name, exact: true });
  const label = checkbox.element().closest("label");
  if (!label) throw new Error(`Missing label for ${name}`);
  await userEvent.click(label);
}

function rowNames() {
  return Array.from(document.querySelectorAll("tbody tr [role=rowheader]")).map(
    (cell) => cell.textContent,
  );
}

describe("Table Registry items", () => {
  it("combines customer search and plan filters and resets pagination", async () => {
    await render(<Table01 />);
    await nextPage().click();
    await expect.element(resultCount()).toHaveTextContent("6–10 of 12 customers");
    await page.getByRole("textbox", { name: "Search customers" }).fill("acme.co");
    await expect.element(resultCount()).toHaveTextContent("1–2 of 2 customers");
    await expect.element(previousPage()).toBeDisabled();
    await userEvent.selectOptions(page.getByRole("combobox", { name: "Filter by plan" }), "Pro");
    await expect.element(resultCount()).toHaveTextContent("1–1 of 1 customers");
    await expect.element(page.getByText("Olivia Rhye", { exact: true })).toBeVisible();
    await page.getByRole("textbox", { name: "Search customers" }).fill("no such customer");
    await expect.element(page.getByText("No customers found")).toBeVisible();
    await expect.element(nextPage()).toBeDisabled();
    await page.getByRole("button", { name: "Reset filters" }).click();
    await expect.element(resultCount()).toHaveTextContent("1–5 of 12 customers");
  });

  it("selects the current page and preserves selected IDs through sorting, filtering, and paging", async () => {
    await render(<Table01 />);
    await clickCheckbox("Select Olivia Rhye");
    await expect
      .element(page.getByRole("checkbox", { name: "Select current page" }))
      .toBePartiallyChecked();
    await clickCheckbox("Select current page");
    await expect.element(resultCount()).toHaveTextContent("5 selected");
    await nextPage().click();
    await expect
      .element(page.getByRole("checkbox", { name: "Select current page" }))
      .not.toBeChecked();
    await clickCheckbox("Select Natali Craig");
    await expect.element(resultCount()).toHaveTextContent("6 selected");
    await page.getByRole("columnheader", { name: "Customer", exact: true }).click();
    await page.getByRole("textbox", { name: "Search customers" }).fill("olivia");
    await expect
      .element(page.getByRole("checkbox", { name: "Select Olivia Rhye", exact: true }))
      .toBeChecked();
    await clickCheckbox("Select current page");
    await expect.element(resultCount()).toHaveTextContent("5 selected");
    await page.getByRole("button", { name: "Clear filters" }).click();
    await page.getByRole("textbox", { name: "Search customers" }).fill("natali");
    await expect
      .element(page.getByRole("checkbox", { name: "Select Natali Craig", exact: true }))
      .toBeChecked();
  });

  it("sorts invoice amounts numerically and dates chronologically", async () => {
    await render(<Table02 />);
    const amount = page.getByRole("columnheader", { name: "Amount", exact: true });
    await amount.click();
    await expect.element(amount).toHaveAttribute("aria-sort", "ascending");
    await expect
      .poll(rowNames)
      .toEqual(["INV-1032", "INV-1036", "INV-1040", "INV-1031", "INV-1034"]);
    await amount.click();
    await expect.poll(() => rowNames()[0]).toBe("INV-1041");
    const due = page.getByRole("columnheader", { name: "Due date", exact: true });
    await due.click();
    await expect.poll(() => rowNames()[0]).toBe("INV-1032");
    await userEvent.selectOptions(
      page.getByRole("combobox", { name: "Filter by status" }),
      "Overdue",
    );
    await expect.element(resultCount()).toHaveTextContent("1–3 of 3 invoices");
    await page.getByRole("textbox", { name: "Search invoices" }).fill("Catalog");
    await expect.poll(rowNames).toEqual(["INV-1032"]);
  });

  it("filters projects and supports keyboard sorting", async () => {
    await render(<Table03 />);
    await userEvent.selectOptions(
      page.getByRole("combobox", { name: "Filter by status" }),
      "Completed",
    );
    await expect.element(resultCount()).toHaveTextContent("1–3 of 3 projects");
    const project = page.getByRole("columnheader", { name: "Project", exact: true });
    (project.element() as HTMLElement).focus();
    await userEvent.keyboard("{Enter}");
    await expect.element(project).toHaveAttribute("aria-sort", "ascending");
    await expect
      .element(page.getByRole("progressbar", { name: "Accessibility audit progress" }))
      .toHaveAttribute("aria-valuenow", "100");
    await page.getByRole("textbox", { name: "Search projects" }).fill("help");
    await expect.element(resultCount()).toHaveTextContent("1–1 of 1 projects");
  });

  it("hides product columns without losing filters or changing row identity", async () => {
    await render(<Table04 />);
    await userEvent.selectOptions(
      page.getByRole("combobox", { name: "Filter by category" }),
      "Workspace",
    );
    await page.getByRole("button", { name: "Columns", exact: true }).click();
    await clickCheckbox("Category");
    await expect
      .element(page.getByRole("columnheader", { name: "Category", exact: true }))
      .not.toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("button", { name: "Columns", exact: true })).toHaveFocus();
    await expect.element(resultCount()).toHaveTextContent("1–4 of 4 products");
    await page.getByRole("textbox", { name: "Search products" }).fill("WS-010");
    await expect.element(page.getByText("Wireless keyboard", { exact: true })).toBeVisible();
    await expect.element(resultCount()).toHaveTextContent("1–1 of 1 products");
    await page.getByRole("button", { name: "Columns", exact: true }).click();
    await clickCheckbox("Category");
    await userEvent.keyboard("{Escape}");
    await expect
      .element(page.getByRole("columnheader", { name: "Category", exact: true }))
      .toBeVisible();
  });
});
