import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDButton variant="tonal">Enabled</MDButton>
      <MDButton isDisabled variant="tonal">
        Disabled
      </MDButton>
      <MDButton className="before:opacity-[0.08]" variant="tonal">
        Hovered
      </MDButton>
      <MDButton
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="tonal"
      >
        Focused
      </MDButton>
      <MDButton className="rounded-[8px] before:opacity-[0.1]" variant="tonal">
        Pressed
      </MDButton>
    </div>
  );
}
