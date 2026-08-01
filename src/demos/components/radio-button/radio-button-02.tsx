import {
  RadioButton,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
} from "@/components/radio-button/radio-button";

export default function RadioButtonDemo() {
  return (
    <RadioGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fffbfe] p-5 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      defaultValue="standard"
    >
      <RadioGroupLabel>Billing address</RadioGroupLabel>
      <RadioGroupDescription>
        Choose how your invoices are delivered.
      </RadioGroupDescription>
      <div className="mt-2 grid gap-1">
        <RadioButton value="standard">Standard post</RadioButton>
        <RadioButton value="email">Email delivery</RadioButton>
        <RadioButton value="pickup">Collect at branch</RadioButton>
      </div>
    </RadioGroup>
  );
}
