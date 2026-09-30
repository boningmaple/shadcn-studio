"use client";

import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
  type ColumnDef,
  columnVisibilityFeature,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import { useId } from "react";
import { Dialog } from "react-aria-components";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
};

const data: Product[] = [
  {
    id: "s01",
    name: "Arc desk lamp",
    sku: "WS-001",
    category: "Workspace",
    price: 89,
    stock: 42,
    sold: 128,
  },
  {
    id: "s02",
    name: "Everyday tote",
    sku: "AC-002",
    category: "Accessories",
    price: 32,
    stock: 8,
    sold: 246,
  },
  {
    id: "s03",
    name: "Ceramic mug",
    sku: "LS-003",
    category: "Lifestyle",
    price: 24,
    stock: 64,
    sold: 312,
  },
  {
    id: "s04",
    name: "Studio notebook",
    sku: "WS-004",
    category: "Workspace",
    price: 18,
    stock: 120,
    sold: 482,
  },
  {
    id: "s05",
    name: "Minimal wallet",
    sku: "AC-005",
    category: "Accessories",
    price: 48,
    stock: 0,
    sold: 186,
  },
  {
    id: "s06",
    name: "Oak desk tray",
    sku: "WS-006",
    category: "Workspace",
    price: 54,
    stock: 26,
    sold: 94,
  },
  {
    id: "s07",
    name: "Glass water bottle",
    sku: "LS-007",
    category: "Lifestyle",
    price: 28,
    stock: 7,
    sold: 218,
  },
  {
    id: "s08",
    name: "Canvas pouch",
    sku: "AC-008",
    category: "Accessories",
    price: 22,
    stock: 38,
    sold: 165,
  },
  {
    id: "s09",
    name: "Linen cushion",
    sku: "LS-009",
    category: "Lifestyle",
    price: 42,
    stock: 18,
    sold: 72,
  },
  {
    id: "s10",
    name: "Wireless keyboard",
    sku: "WS-010",
    category: "Workspace",
    price: 129,
    stock: 15,
    sold: 108,
  },
  {
    id: "s11",
    name: "Travel organizer",
    sku: "AC-011",
    category: "Accessories",
    price: 36,
    stock: 0,
    sold: 154,
  },
  {
    id: "s12",
    name: "Scented candle",
    sku: "LS-012",
    category: "Lifestyle",
    price: 30,
    stock: 54,
    sold: 267,
  },
];

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
  columnVisibilityFeature,
});

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const badgeColors: Record<string, string> = {
  Workspace: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300",
  Accessories: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
  Lifestyle: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
};

const columns: ColumnDef<typeof features, Product>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.name} ${row.sku}`,
    enableGlobalFilter: true,
    header: "Product",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${badgeColors[row.original.category]}`}
        >
          <Package aria-hidden="true" className="size-5" />
        </span>
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="mt-0.5 font-mono text-xs text-muted-foreground">{row.original.sku}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    filterFn: "equals",
    cell: ({ row }) => (
      <Badge variant="secondary" className={badgeColors[row.original.category]}>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{currency.format(row.original.price)}</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center gap-2 text-xs tabular-nums ${row.original.stock === 0 ? "text-rose-700 dark:text-rose-300" : row.original.stock < 10 ? "text-amber-800 dark:text-amber-300" : "text-muted-foreground"}`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.original.stock === 0 ? "Out of stock" : `${row.original.stock} in stock`}
      </span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">{row.original.sold}</span>
    ),
  },
];

export default function Table04() {
  const headingId = useId();
  const table = useTable({
    features,
    data,
    columns,
    getRowId: (row) => row.id,
    defaultColumn: { enableGlobalFilter: false },
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });
  const rows = table.getRowModel().rows;
  const visibleColumns = table.getVisibleLeafColumns();
  const sorting = table.state.sorting[0];
  const rowCount = table.getRowCount();
  const { pageIndex, pageSize } = table.state.pagination;
  const filterValue = table.getColumn("category")?.getFilterValue();
  const hasFilters = Boolean(table.state.globalFilter || table.state.columnFilters.length);
  function clearFilters() {
    table.setGlobalFilter("");
    table.resetColumnFilters();
    table.firstPage();
  }
  return (
    <section
      aria-labelledby={headingId}
      className="w-full min-w-0 max-w-5xl overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6 pb-5">
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">
            <Package aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              THE EVERYDAY EDIT
            </p>
            <h2 id={headingId} className="text-xl font-semibold tracking-tight">
              Products{" "}
              <span className="ml-1 align-middle text-xs font-normal text-muted-foreground">
                {data.length}
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Thoughtful essentials. All in one place.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t px-6 py-4">
        <div className="relative w-full sm:w-auto sm:min-w-40 sm:flex-1 sm:max-w-72">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground"
          />
          <Input
            aria-label="Search products"
            placeholder="Search product or SKU…"
            value={String(table.state.globalFilter ?? "")}
            className="h-9 pl-9"
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
              table.firstPage();
            }}
          />
        </div>
        <NativeSelect
          aria-label="Filter by category"
          value={typeof filterValue === "string" ? filterValue : ""}
          className="[&_select]:h-9"
          onChange={(event) => {
            table.getColumn("category")?.setFilterValue(event.target.value || undefined);
            table.firstPage();
          }}
        >
          <NativeSelectOption value="">All categories</NativeSelectOption>
          <NativeSelectOption value="Workspace">Workspace</NativeSelectOption>
          <NativeSelectOption value="Accessories">Accessories</NativeSelectOption>
          <NativeSelectOption value="Lifestyle">Lifestyle</NativeSelectOption>
        </NativeSelect>
        {hasFilters && (
          <Button variant="ghost" onPress={clearFilters}>
            Clear filters
          </Button>
        )}
        <PopoverTrigger>
          <Button variant="outline" className="h-9 sm:ml-auto">
            <SlidersHorizontal aria-hidden="true" /> Columns
          </Button>
          <Popover placement="bottom end" className="w-48 p-4">
            <Dialog aria-label="Visible columns" className="outline-none">
              <p className="mb-3 text-sm font-semibold">Visible columns</p>
              <div className="space-y-1">
                {table
                  .getAllLeafColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <Checkbox
                      key={column.id}
                      isSelected={column.getIsVisible()}
                      className="h-8 w-full justify-start gap-2 border-0 after:inset-0 bg-transparent text-foreground dark:bg-transparent data-selected:bg-transparent data-selected:text-foreground dark:data-selected:bg-transparent [&_[data-slot=checkbox-indicator]]:size-4 [&_[data-slot=checkbox-indicator]]:rounded [&_[data-slot=checkbox-indicator]]:border"
                      onChange={(value) => column.toggleVisibility(value)}
                    >
                      {String(column.columnDef.header)}
                    </Checkbox>
                  ))}
              </div>
            </Dialog>
          </Popover>
        </PopoverTrigger>
      </div>
      <Table
        aria-labelledby={headingId}
        className="min-w-[680px]"
        sortDescriptor={
          sorting
            ? { column: sorting.id, direction: sorting.desc ? "descending" : "ascending" }
            : undefined
        }
        onSortChange={(descriptor) => {
          table.setSorting([
            { id: String(descriptor.column), desc: descriptor.direction === "descending" },
          ]);
          table.firstPage();
        }}
      >
        <TableHeader className="bg-muted/50">
          {visibleColumns.map((column) => (
            <TableHead
              key={column.id}
              id={column.id}
              isRowHeader={column.id === "name"}
              allowsSorting={column.getCanSort()}
              className={`h-11 px-5 text-xs text-muted-foreground outline-none focus-visible:bg-muted ${["price", "stock", "sold"].includes(column.id) ? "text-right" : ""}`}
            >
              <span
                className={`inline-flex items-center gap-1.5 ${column.getCanSort() ? "cursor-pointer select-none" : ""}`}
              >
                {String(column.columnDef.header)}
                {column.getCanSort() &&
                  (column.getIsSorted() === "asc" ? (
                    <ArrowUp aria-hidden="true" className="size-3.5" />
                  ) : column.getIsSorted() === "desc" ? (
                    <ArrowDown aria-hidden="true" className="size-3.5" />
                  ) : (
                    <ArrowUpDown aria-hidden="true" className="size-3.5 opacity-50" />
                  ))}
              </span>
            </TableHead>
          ))}
        </TableHeader>
        <TableBody
          renderEmptyState={() => (
            <div className="py-12">
              <Search aria-hidden="true" className="mx-auto mb-3 size-6 text-muted-foreground" />
              <p className="font-medium">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another search or clear your filters.
              </p>
              <Button variant="outline" className="mt-4" onPress={clearFilters}>
                Reset filters
              </Button>
            </div>
          )}
        >
          {rows.map((row) => (
            <TableRow
              key={row.id}
              id={row.id}
              textValue={row.original.name}
              className="outline-none focus-visible:bg-muted/70"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`px-5 py-3 ${["price", "stock", "sold"].includes(cell.column.id) ? "text-right" : ""}`}
                >
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-6 py-4">
        <output className="text-xs text-muted-foreground">
          {rowCount === 0
            ? "0 results"
            : `${pageIndex * pageSize + 1}–${Math.min((pageIndex + 1) * pageSize, rowCount)} of ${rowCount} products`}
        </output>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            Page {pageIndex + 1} of {Math.max(1, table.getPageCount())}
          </span>
          <div className="flex gap-1.5">
            <Button
              aria-label="Previous page"
              variant="outline"
              size="icon"
              isDisabled={!table.getCanPreviousPage()}
              onPress={() => table.previousPage()}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              aria-label="Next page"
              variant="outline"
              size="icon"
              isDisabled={!table.getCanNextPage()}
              onPress={() => table.nextPage()}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
