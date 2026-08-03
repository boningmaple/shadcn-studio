import {
  M3RadioButton,
  M3RadioGroup,
  M3RadioGroupDescription,
  M3RadioGroupLabel,
} from "@/material-3-ui/components/m3-radio-button/m3-radio-button";

export default function M3RadioButtonDemo() {
  return (
    <M3RadioGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      defaultValue="standard"
    >
      <M3RadioGroupLabel>Billing address</M3RadioGroupLabel>
      <M3RadioGroupDescription>
        Choose how your invoices are delivered.
      </M3RadioGroupDescription>
      <div className="mt-2 grid gap-1">
        <M3RadioButton value="standard">Standard post</M3RadioButton>
        <M3RadioButton value="email">Email delivery</M3RadioButton>
        <M3RadioButton value="pickup">Collect at branch</M3RadioButton>
      </div>
    </M3RadioGroup>
  );
}
