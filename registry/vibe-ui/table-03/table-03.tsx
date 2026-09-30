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
  Layers3,
} from "lucide-react";
import { useId } from "react";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Project = {
  id: string;
  name: string;
  category: string;
  status: string;
  progress: number;
  team: string[];
  priority: string;
  due: string;
};

const data: Project[] = [
  {
    id: "p01",
    name: "Website redesign",
    category: "Brand & experience",
    status: "In progress",
    progress: 68,
    team: ["Olivia Rhye", "Phoenix Baker", "Lana Steiner"],
    priority: "High",
    due: "2026-10-12",
  },
  {
    id: "p02",
    name: "Mobile app launch",
    category: "Product design",
    status: "In review",
    progress: 92,
    team: ["Demi Wilkinson", "Drew Cano"],
    priority: "High",
    due: "2026-10-05",
  },
  {
    id: "p03",
    name: "Design system",
    category: "Design operations",
    status: "In progress",
    progress: 45,
    team: ["Natali Craig", "Andi Lane", "Kate Morrison"],
    priority: "Medium",
    due: "2026-10-24",
  },
  {
    id: "p04",
    name: "Autumn campaign",
    category: "Marketing",
    status: "Completed",
    progress: 100,
    team: ["Lana Steiner", "Milo Ward"],
    priority: "Medium",
    due: "2026-09-26",
  },
  {
    id: "p05",
    name: "Customer portal",
    category: "Engineering",
    status: "In progress",
    progress: 32,
    team: ["Phoenix Baker", "Orlando Diggs"],
    priority: "High",
    due: "2026-11-02",
  },
  {
    id: "p06",
    name: "Brand guidelines",
    category: "Brand & experience",
    status: "In review",
    progress: 88,
    team: ["Olivia Rhye", "Sienna Hewitt"],
    priority: "Low",
    due: "2026-10-08",
  },
  {
    id: "p07",
    name: "Onboarding flow",
    category: "Product design",
    status: "In progress",
    progress: 56,
    team: ["Demi Wilkinson", "Kate Morrison"],
    priority: "Medium",
    due: "2026-10-18",
  },
  {
    id: "p08",
    name: "Analytics dashboard",
    category: "Engineering",
    status: "In progress",
    progress: 24,
    team: ["Orlando Diggs", "Milo Ward"],
    priority: "Low",
    due: "2026-11-10",
  },
  {
    id: "p09",
    name: "Help center",
    category: "Customer experience",
    status: "Completed",
    progress: 100,
    team: ["Andi Lane", "Natali Craig"],
    priority: "Low",
    due: "2026-09-20",
  },
  {
    id: "p10",
    name: "Checkout refresh",
    category: "Product design",
    status: "In review",
    progress: 95,
    team: ["Drew Cano", "Lana Steiner"],
    priority: "High",
    due: "2026-10-03",
  },
  {
    id: "p11",
    name: "Partner program",
    category: "Marketing",
    status: "In progress",
    progress: 18,
    team: ["Sienna Hewitt", "Kate Morrison"],
    priority: "Medium",
    due: "2026-11-15",
  },
  {
    id: "p12",
    name: "Accessibility audit",
    category: "Design operations",
    status: "Completed",
    progress: 100,
    team: ["Olivia Rhye", "Andi Lane"],
    priority: "High",
    due: "2026-09-22",
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
  "In progress": "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300",
  "In review": "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
  Completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
};

const columns: ColumnDef<typeof features, Project>[] = [
  {
    id: "name",
    accessorFn: (row) => row.name,
    enableGlobalFilter: true,
    header: "Project",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{row.original.category}</div>
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
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex min-w-28 items-center gap-3">
        <Progress
          aria-label={`${row.original.name} progress`}
          value={row.original.progress}
          className="w-20 [&_[data-slot=progress-indicator]]:bg-violet-500"
        />
        <span className="text-xs text-muted-foreground tabular-nums">{row.original.progress}%</span>
      </div>
    ),
  },
  {
    accessorKey: "team",
    header: "Team",
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarGroup aria-label={row.original.team.join(", ")} className="-space-x-1">
        {row.original.team.map((name) => (
          <Avatar key={name} title={name}>
            <AvatarFallback className="bg-muted text-[10px] text-foreground">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-2 text-xs">
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${row.original.priority === "High" ? "bg-orange-500" : row.original.priority === "Medium" ? "bg-violet-500" : "bg-slate-400"}`}
        />
        {row.original.priority}
      </span>
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

export default function Table03() {
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
  return (
    <section
      aria-labelledby={headingId}
      className="w-full min-w-0 max-w-5xl overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6 pb-5">
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300">
            <Layers3 aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              WORK IN MOTION
            </p>
            <h2 id={headingId} className="text-xl font-semibold tracking-tight">
              Projects{" "}
              <span className="ml-1 align-middle text-xs font-normal text-muted-foreground">
                {data.length}
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Big ideas, moving forward together.
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
            aria-label="Search projects"
            placeholder="Search projects…"
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
          <NativeSelectOption value="In progress">In progress</NativeSelectOption>
          <NativeSelectOption value="In review">In review</NativeSelectOption>
          <NativeSelectOption value="Completed">Completed</NativeSelectOption>
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
              isRowHeader={column.id === "name"}
              allowsSorting={column.getCanSort()}
              className="h-11 px-5 text-xs text-muted-foreground outline-none focus-visible:bg-muted"
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
              <p className="font-medium">No projects found</p>
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
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id} className="px-5 py-4">
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
            : `${pageIndex * pageSize + 1}–${Math.min((pageIndex + 1) * pageSize, rowCount)} of ${rowCount} projects`}
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
