import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupDescription,
  CheckboxGroupError,
  CheckboxGroupLabel,
} from "@/components/checkbox/checkbox";

export default function CheckboxDemo() {
  return (
    <CheckboxGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fff8f7] p-5 shadow-sm ring-1 ring-[#b3261e]/30 dark:bg-[#211f26] dark:ring-[#f2b8b5]/30"
      defaultValue={[]}
      isInvalid
      isRequired
      validationBehavior="aria"
    >
      <CheckboxGroupLabel>Required approvals</CheckboxGroupLabel>
      <CheckboxGroupDescription>
        At least one approval is needed to continue.
      </CheckboxGroupDescription>
      <div className="mt-2 grid gap-1">
        <Checkbox value="terms">Accept product terms</Checkbox>
        <Checkbox value="privacy">Accept privacy policy</Checkbox>
      </div>
      <CheckboxGroupError>Choose at least one approval.</CheckboxGroupError>
    </CheckboxGroup>
  );
}
