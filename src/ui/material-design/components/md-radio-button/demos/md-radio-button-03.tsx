import {
  MDRadioButton,
  MDRadioGroup,
  MDRadioGroupDescription,
  MDRadioGroupError,
  MDRadioGroupLabel,
} from "@/ui/material-design/components/md-radio-button/md-radio-button";

export default function MDRadioButtonDemo() {
  return (
    <MDRadioGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fff8f7] p-5 shadow-sm ring-1 ring-[#b3261e]/30 dark:bg-[#211f26] dark:ring-[#f2b8b5]/30"
      isInvalid
      isRequired
      validationBehavior="aria"
    >
      <MDRadioGroupLabel>Payment method</MDRadioGroupLabel>
      <MDRadioGroupDescription>
        Select how you want to pay for this order.
      </MDRadioGroupDescription>
      <div className="mt-2 grid gap-1">
        <MDRadioButton value="card">Credit card</MDRadioButton>
        <MDRadioButton value="paypal">PayPal</MDRadioButton>
        <MDRadioButton value="invoice">Invoice</MDRadioButton>
      </div>
      <MDRadioGroupError>
        Select a payment method to continue.
      </MDRadioGroupError>
    </MDRadioGroup>
  );
}
