import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-4">
      <MDButton size="xs">XS</MDButton>
      <MDButton size="sm">SM</MDButton>
      <MDButton size="md">MD</MDButton>
      <MDButton size="lg">LG</MDButton>
      <MDButton size="xl">XL</MDButton>
    </div>
  );
}
