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
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ReceiptText,
} from "lucide-react";
import { useId } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

type Invoice = {
  id: string;
  customer: string;
  email: string;
  status: string;
  amount: number;
  due: string;
};

const data: Invoice[] = [
  {
    id: "INV-1042",
    customer: "Acme Studio",
    email: "billing@acme.co",
    status: "Paid",
    amount: 2400,
    due: "2026-09-28",
  },
  {
    id: "INV-1041",
    customer: "Layers",
    email: "finance@layers.co",
    status: "Pending",
    amount: 6800,
    due: "2026-10-04",
  },
  {
    id: "INV-1040",
    customer: "Sisyphus",
    email: "hello@sisyphus.co",
    status: "Overdue",
    amount: 1250,
    due: "2026-09-18",
  },
  {
    id: "INV-1039",
    customer: "Catalog",
    email: "billing@catalog.co",
    status: "Paid",
    amount: 3600,
    due: "2026-09-24",
  },
  {
    id: "INV-1038",
    customer: "Circooles",
    email: "finance@circooles.co",
    status: "Pending",
    amount: 1800,
    due: "2026-10-08",
  },
  {
    id: "INV-1037",
    customer: "Hourglass",
    email: "hello@hourglass.co",
    status: "Paid",
    amount: 4200,
    due: "2026-09-22",
  },
  {
    id: "INV-1036",
    customer: "Quotient",
    email: "billing@quotient.co",
    status: "Overdue",
    amount: 960,
    due: "2026-09-12",
  },
  {
    id: "INV-1035",
    customer: "Capsule",
    email: "finance@capsule.co",
    status: "Paid",
    amount: 2800,
    due: "2026-09-20",
  },
  {
    id: "INV-1034",
    customer: "Acme Studio",
    email: "billing@acme.co",
    status: "Pending",
    amount: 1600,
    due: "2026-10-12",
  },
  {
    id: "INV-1033",
    customer: "Layers",
    email: "finance@layers.co",
    status: "Paid",
    amount: 5200,
    due: "2026-09-14",
  },
  {
    id: "INV-1032",
    customer: "Catalog",
    email: "billing@catalog.co",
    status: "Overdue",
    amount: 720,
    due: "2026-09-08",
  },
  {
    id: "INV-1031",
    customer: "Sisyphus",
    email: "hello@sisyphus.co",
    status: "Paid",
    amount: 1450,
    due: "2026-09-10",
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

const badgeColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
  Overdue: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300",
};

const columns: ColumnDef<typeof features, Invoice>[] = [
  {
    id: "id",
    accessorFn: (row) => `${row.id} ${row.customer}`,
    enableGlobalFilter: true,
    header: "Invoice",
    cell: ({ row }) => <span className="font-medium tabular-nums">{row.original.id}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.customer}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equals",
    cell: ({ row }) => (
      <Badge variant="secondary" className={badgeColors[row.original.status]}>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{currency.format(row.original.amount)}</span>
    ),
  },
  {
    accessorKey: "due",
    header: "Due date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{dateFormat.format(new Date(row.original.due))}</span>
    ),
  },
];

export default function Table02() {
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
  const filterValue = table.getColumn("status")?.getFilterValue();
  const hasFilters = Boolean(table.state.globalFilter || table.state.columnFilters.length);
  function clearFilters() {
    table.setGlobalFilter("");
    table.resetColumnFilters();
    table.firstPage();
  }
  const summaries = [
    {
      label: "Collected",
      amount: data
        .filter((invoice) => invoice.status === "Paid")
        .reduce((sum, invoice) => sum + invoice.amount, 0),
      detail: "Paid invoices",
      color: "text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Awaiting payment",
      amount: data
        .filter((invoice) => invoice.status === "Pending")
        .reduce((sum, invoice) => sum + invoice.amount, 0),
      detail: "Upcoming payments",
      color: "text-foreground",
    },
    {
      label: "Overdue",
      amount: data
        .filter((invoice) => invoice.status === "Overdue")
        .reduce((sum, invoice) => sum + invoice.amount, 0),
      detail: "Needs a follow-up",
      color: "text-rose-700 dark:text-rose-300",
    },
  ];
  return (
    <section
      aria-labelledby={headingId}
      className="w-full min-w-0 max-w-5xl overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6 pb-5">
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300">
            <ReceiptText aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              BILLING OVERVIEW
            </p>
            <h2 id={headingId} className="text-xl font-semibold tracking-tight">
              Invoices{" "}
              <span className="ml-1 align-middle text-xs font-normal text-muted-foreground">
                {data.length}
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Good work. Paid on time.</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 px-6 pb-5 sm:grid-cols-3">
        {summaries.map((summary) => (
          <div key={summary.label} className="rounded-xl border bg-muted/20 p-4">
            <p className="text-xs font-medium text-muted-foreground">{summary.label}</p>
            <p
              className={`mt-2 text-2xl font-semibold tracking-tight tabular-nums ${summary.color}`}
            >
              {currency.format(summary.amount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{summary.detail}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t px-6 py-4">
        <div className="relative w-full sm:w-auto sm:min-w-40 sm:flex-1 sm:max-w-72">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground"
          />
          <Input
            aria-label="Search invoices"
            placeholder="Search invoice or customer…"
            value={String(table.state.globalFilter ?? "")}
            className="h-9 pl-9"
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
              table.firstPage();
            }}
          />
        </div>
        <NativeSelect
          aria-label="Filter by status"
          value={typeof filterValue === "string" ? filterValue : ""}
          className="[&_select]:h-9"
          onChange={(event) => {
            table.getColumn("status")?.setFilterValue(event.target.value || undefined);
            table.firstPage();
          }}
        >
          <NativeSelectOption value="">All statuses</NativeSelectOption>
          <NativeSelectOption value="Paid">Paid</NativeSelectOption>
          <NativeSelectOption value="Pending">Pending</NativeSelectOption>
          <NativeSelectOption value="Overdue">Overdue</NativeSelectOption>
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
      >
        <TableHeader className="bg-muted/50">
          {visibleColumns.map((column) => (
            <TableHead
              key={column.id}
              id={column.id}
              isRowHeader={column.id === "id"}
              allowsSorting={column.getCanSort()}
              className={`h-11 px-5 text-xs text-muted-foreground outline-none focus-visible:bg-muted ${["amount"].includes(column.id) ? "text-right" : ""}`}
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
              <p className="font-medium">No invoices found</p>
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
              textValue={row.original.customer}
              className="outline-none focus-visible:bg-muted/70"
            >
              {row.getAllCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`px-5 py-4 ${["amount"].includes(cell.column.id) ? "text-right" : ""}`}
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
            : `${pageIndex * pageSize + 1}–${Math.min((pageIndex + 1) * pageSize, rowCount)} of ${rowCount} invoices`}
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
