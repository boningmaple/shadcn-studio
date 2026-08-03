import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDButton variant="elevated">Enabled</MDButton>
      <MDButton isDisabled variant="elevated">
        Disabled
      </MDButton>
      <MDButton
        className="before:opacity-[0.08] shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]"
        variant="elevated"
      >
        Hovered
      </MDButton>
      <MDButton
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="elevated"
      >
        Focused
      </MDButton>
      <MDButton
        className="rounded-[8px] before:opacity-[0.1]"
        variant="elevated"
      >
        Pressed
      </MDButton>
    </div>
  );
}
