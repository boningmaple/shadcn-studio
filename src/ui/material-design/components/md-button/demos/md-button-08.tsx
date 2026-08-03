import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDButton shape="round">Round</MDButton>
      <MDButton shape="square">Square</MDButton>
    </div>
  );
}
