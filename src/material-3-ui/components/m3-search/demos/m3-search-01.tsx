import { M3SearchBar } from "@/material-3-ui/components/m3-search/m3-search";

export default function M3SearchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <M3SearchBar aria-label="Search files" placeholder="Search files" />
      <M3SearchBar
        aria-label="Search components"
        defaultValue="Navigation"
        placeholder="Search components"
      />
      <M3SearchBar
        aria-label="Search archived projects"
        isDisabled
        placeholder="Search archived projects"
      />
    </div>
  );
}
