import { MDSearchBar } from "@/ui/material-design/components/md-search/md-search";

export default function MDSearchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <MDSearchBar aria-label="Search files" placeholder="Search files" />
      <MDSearchBar
        aria-label="Search components"
        defaultValue="Navigation"
        placeholder="Search components"
      />
      <MDSearchBar
        aria-label="Search archived projects"
        isDisabled
        placeholder="Search archived projects"
      />
    </div>
  );
}
