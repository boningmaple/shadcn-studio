import {
  MDRadioButton,
  MDRadioGroup,
  MDRadioGroupDescription,
  MDRadioGroupLabel,
} from "@/ui/material-design/components/md-radio-button/md-radio-button";

export default function MDRadioButtonDemo() {
  return (
    <MDRadioGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      defaultValue="standard"
    >
      <MDRadioGroupLabel>Billing address</MDRadioGroupLabel>
      <MDRadioGroupDescription>
        Choose how your invoices are delivered.
      </MDRadioGroupDescription>
      <div className="mt-2 grid gap-1">
        <MDRadioButton value="standard">Standard post</MDRadioButton>
        <MDRadioButton value="email">Email delivery</MDRadioButton>
        <MDRadioButton value="pickup">Collect at branch</MDRadioButton>
      </div>
    </MDRadioGroup>
  );
}
