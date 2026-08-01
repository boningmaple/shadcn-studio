import {
  RadioButton,
  RadioGroup,
  RadioGroupDescription,
  RadioGroupError,
  RadioGroupLabel,
} from "@/components/radio-button/radio-button";

export default function RadioButtonDemo() {
  return (
    <RadioGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fff8f7] p-5 shadow-sm ring-1 ring-[#b3261e]/30 dark:bg-[#211f26] dark:ring-[#f2b8b5]/30"
      isInvalid
      isRequired
      validationBehavior="aria"
    >
      <RadioGroupLabel>Payment method</RadioGroupLabel>
      <RadioGroupDescription>
        Select how you want to pay for this order.
      </RadioGroupDescription>
      <div className="mt-2 grid gap-1">
        <RadioButton value="card">Credit card</RadioButton>
        <RadioButton value="paypal">PayPal</RadioButton>
        <RadioButton value="invoice">Invoice</RadioButton>
      </div>
      <RadioGroupError>Select a payment method to continue.</RadioGroupError>
    </RadioGroup>
  );
}
