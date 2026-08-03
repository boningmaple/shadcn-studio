import {
  M3Checkbox,
  M3CheckboxGroup,
  M3CheckboxGroupDescription,
  M3CheckboxGroupError,
  M3CheckboxGroupLabel,
} from "@/material-3-ui/components/m3-checkbox/m3-checkbox";

export default function M3CheckboxDemo() {
  return (
    <M3CheckboxGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fff8f7] p-5 shadow-sm ring-1 ring-[#b3261e]/30 dark:bg-[#211f26] dark:ring-[#f2b8b5]/30"
      defaultValue={[]}
      isInvalid
      isRequired
      validationBehavior="aria"
    >
      <M3CheckboxGroupLabel>Required approvals</M3CheckboxGroupLabel>
      <M3CheckboxGroupDescription>
        At least one approval is needed to continue.
      </M3CheckboxGroupDescription>
      <div className="mt-2 grid gap-1">
        <M3Checkbox value="terms">Accept product terms</M3Checkbox>
        <M3Checkbox value="privacy">Accept privacy policy</M3Checkbox>
      </div>
      <M3CheckboxGroupError>Choose at least one approval.</M3CheckboxGroupError>
    </M3CheckboxGroup>
  );
}
