import { SearchBar } from "@/components/search/search";

export default function SearchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <SearchBar aria-label="Search files" placeholder="Search files" />
      <SearchBar
        aria-label="Search components"
        defaultValue="Navigation"
        placeholder="Search components"
      />
      <SearchBar
        aria-label="Search archived projects"
        isDisabled
        placeholder="Search archived projects"
      />
    </div>
  );
}
