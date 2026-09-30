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
  rowSelectionFeature,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
} from "lucide-react";
import { useId } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  spend: number;
  joined: string;
};

const data: Customer[] = [
  {
    id: "c01",
    name: "Olivia Rhye",
    email: "olivia@acme.co",
    company: "Acme Studio",
    plan: "Pro",
    spend: 2480,
    joined: "2026-09-12",
  },
  {
    id: "c02",
    name: "Phoenix Baker",
    email: "phoenix@layers.co",
    company: "Layers",
    plan: "Enterprise",
    spend: 12600,
    joined: "2026-08-24",
  },
  {
    id: "c03",
    name: "Lana Steiner",
    email: "lana@sisyphus.co",
    company: "Sisyphus",
    plan: "Starter",
    spend: 240,
    joined: "2026-09-18",
  },
  {
    id: "c04",
    name: "Demi Wilkinson",
    email: "demi@catalog.co",
    company: "Catalog",
    plan: "Pro",
    spend: 1860,
    joined: "2026-07-03",
  },
  {
    id: "c05",
    name: "Drew Cano",
    email: "drew@circooles.co",
    company: "Circooles",
    plan: "Pro",
    spend: 3240,
    joined: "2026-08-09",
  },
  {
    id: "c06",
    name: "Natali Craig",
    email: "natali@hourglass.co",
    company: "Hourglass",
    plan: "Enterprise",
    spend: 8400,
    joined: "2026-06-15",
  },
  {
    id: "c07",
    name: "Orlando Diggs",
    email: "orlando@acme.co",
    company: "Acme Studio",
    plan: "Starter",
    spend: 120,
    joined: "2026-09-21",
  },
  {
    id: "c08",
    name: "Andi Lane",
    email: "andi@layers.co",
    company: "Layers",
    plan: "Pro",
    spend: 2960,
    joined: "2026-08-30",
  },
  {
    id: "c09",
    name: "Kate Morrison",
    email: "kate@quotient.co",
    company: "Quotient",
    plan: "Enterprise",
    spend: 9600,
    joined: "2026-07-18",
  },
  {
    id: "c10",
    name: "Koray Okumus",
    email: "koray@capsule.co",
    company: "Capsule",
    plan: "Starter",
    spend: 360,
    joined: "2026-09-02",
  },
  {
    id: "c11",
    name: "Sienna Hewitt",
    email: "sienna@catalog.co",
    company: "Catalog",
    plan: "Pro",
    spend: 1440,
    joined: "2026-08-12",
  },
  {
    id: "c12",
    name: "Milo Ward",
    email: "milo@hourglass.co",
    company: "Hourglass",
    plan: "Starter",
    spend: 480,
    joined: "2026-09-09",
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
  rowSelectionFeature,
});

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const badgeColors: Record<string, string> = {
  Starter: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300",
  Pro: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
  Enterprise: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
};

const columns: ColumnDef<typeof features, Customer>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.name} ${row.email}`,
    enableGlobalFilter: true,
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback className="bg-violet-100 font-medium text-violet-800 dark:bg-violet-400/15 dark:text-violet-300">
            {initials(row.original.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-foreground">{row.original.name}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  { accessorKey: "company", header: "Company" },
  {
    accessorKey: "plan",
    header: "Plan",
    filterFn: "equals",
    cell: ({ row }) => (
      <Badge variant="secondary" className={badgeColors[row.original.plan]}>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.original.plan}
      </Badge>
    ),
  },
  {
    accessorKey: "spend",
    header: "Total spent",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{currency.format(row.original.spend)}</span>
    ),
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {dateFormat.format(new Date(row.original.joined))}
      </span>
    ),
  },
];

export default function Table01() {
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
  const visibleColumns = table.getAllLeafColumns();
  const sorting = table.state.sorting[0];
  const rowCount = table.getRowCount();
  const { pageIndex, pageSize } = table.state.pagination;
  const filterValue = table.getColumn("plan")?.getFilterValue();
  const hasFilters = Boolean(table.state.globalFilter || table.state.columnFilters.length);
  function clearFilters() {
    table.setGlobalFilter("");
    table.resetColumnFilters();
    table.firstPage();
  }
  const selectedKeys = new Set(
    Object.keys(table.state.rowSelection).filter((id) => table.state.rowSelection[id]),
  );
  return (
    <section
      aria-labelledby={headingId}
      className="w-full min-w-0 max-w-5xl overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6 pb-5">
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300">
            <Users aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              YOUR PEOPLE
            </p>
            <h2 id={headingId} className="text-xl font-semibold tracking-tight">
              Customers{" "}
              <span className="ml-1 align-middle text-xs font-normal text-muted-foreground">
                {data.length}
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">A little closer to every customer.</p>
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
            aria-label="Search customers"
            placeholder="Search name or email…"
            value={String(table.state.globalFilter ?? "")}
            className="h-9 pl-9"
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
              table.firstPage();
            }}
          />
        </div>
        <NativeSelect
          aria-label="Filter by plan"
          value={typeof filterValue === "string" ? filterValue : ""}
          className="[&_select]:h-9"
          onChange={(event) => {
            table.getColumn("plan")?.setFilterValue(event.target.value || undefined);
            table.firstPage();
          }}
        >
          <NativeSelectOption value="">All plans</NativeSelectOption>
          <NativeSelectOption value="Starter">Starter</NativeSelectOption>
          <NativeSelectOption value="Pro">Pro</NativeSelectOption>
          <NativeSelectOption value="Enterprise">Enterprise</NativeSelectOption>
        </NativeSelect>
        {hasFilters && (
          <Button variant="ghost" onPress={clearFilters}>
            Clear filters
          </Button>
        )}
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
        selectionMode="multiple"
        selectionBehavior="toggle"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          if (keys === "all") {
            table.toggleAllPageRowsSelected(true);
            return;
          }
          table.setRowSelection(Object.fromEntries([...keys].map((key) => [String(key), true])));
        }}
      >
        <TableHeader className="bg-muted/50">
          <TableHead id="selection" aria-label="Selection" className="w-12 pl-6">
            <Checkbox
              slot={null}
              aria-label="Select current page"
              isSelected={rows.length > 0 && table.getIsAllPageRowsSelected()}
              isIndeterminate={table.getIsSomePageRowsSelected()}
              isDisabled={!rows.length}
              onChange={(value) => table.toggleAllPageRowsSelected(value)}
            />
          </TableHead>
          {visibleColumns.map((column) => (
            <TableHead
              key={column.id}
              id={column.id}
              isRowHeader={column.id === "name"}
              allowsSorting={column.getCanSort()}
              className={`h-11 px-5 text-xs text-muted-foreground outline-none focus-visible:bg-muted ${["spend"].includes(column.id) ? "text-right" : ""}`}
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
              <p className="font-medium">No customers found</p>
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
              <TableCell className="pl-6">
                <Checkbox
                  slot={null}
                  aria-label={`Select ${row.original.name}`}
                  isSelected={row.getIsSelected()}
                  onChange={(value) => row.toggleSelected(value)}
                />
              </TableCell>
              {row.getAllCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`px-5 py-4 ${["spend"].includes(cell.column.id) ? "text-right" : ""}`}
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
            : `${pageIndex * pageSize + 1}–${Math.min((pageIndex + 1) * pageSize, rowCount)} of ${rowCount} customers`}
          {selectedKeys.size > 0 && (
            <span className="ml-2 font-medium text-foreground">· {selectedKeys.size} selected</span>
          )}
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
