import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDButton variant="text">Enabled</MDButton>
      <MDButton isDisabled variant="text">
        Disabled
      </MDButton>
      <MDButton className="before:opacity-[0.08]" variant="text">
        Hovered
      </MDButton>
      <MDButton
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="text"
      >
        Focused
      </MDButton>
      <MDButton className="rounded-[8px] before:opacity-[0.1]" variant="text">
        Pressed
      </MDButton>
    </div>
  );
}
