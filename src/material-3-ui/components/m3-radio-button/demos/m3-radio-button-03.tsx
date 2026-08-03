import {
  M3RadioButton,
  M3RadioGroup,
  M3RadioGroupDescription,
  M3RadioGroupError,
  M3RadioGroupLabel,
} from "@/material-3-ui/components/m3-radio-button/m3-radio-button";

export default function M3RadioButtonDemo() {
  return (
    <M3RadioGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fff8f7] p-5 shadow-sm ring-1 ring-[#b3261e]/30 dark:bg-[#211f26] dark:ring-[#f2b8b5]/30"
      isInvalid
      isRequired
      validationBehavior="aria"
    >
      <M3RadioGroupLabel>Payment method</M3RadioGroupLabel>
      <M3RadioGroupDescription>
        Select how you want to pay for this order.
      </M3RadioGroupDescription>
      <div className="mt-2 grid gap-1">
        <M3RadioButton value="card">Credit card</M3RadioButton>
        <M3RadioButton value="paypal">PayPal</M3RadioButton>
        <M3RadioButton value="invoice">Invoice</M3RadioButton>
      </div>
      <M3RadioGroupError>
        Select a payment method to continue.
      </M3RadioGroupError>
    </M3RadioGroup>
  );
}
