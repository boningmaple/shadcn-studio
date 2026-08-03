import {
  MDCheckbox,
  MDCheckboxGroup,
  MDCheckboxGroupDescription,
  MDCheckboxGroupError,
  MDCheckboxGroupLabel,
} from "@/ui/material-design/components/md-checkbox/md-checkbox";

export default function MDCheckboxDemo() {
  return (
    <MDCheckboxGroup
      className="w-full max-w-sm rounded-[28px] bg-[#fff8f7] p-5 shadow-sm ring-1 ring-[#b3261e]/30 dark:bg-[#211f26] dark:ring-[#f2b8b5]/30"
      defaultValue={[]}
      isInvalid
      isRequired
      validationBehavior="aria"
    >
      <MDCheckboxGroupLabel>Required approvals</MDCheckboxGroupLabel>
      <MDCheckboxGroupDescription>
        At least one approval is needed to continue.
      </MDCheckboxGroupDescription>
      <div className="mt-2 grid gap-1">
        <MDCheckbox value="terms">Accept product terms</MDCheckbox>
        <MDCheckbox value="privacy">Accept privacy policy</MDCheckbox>
      </div>
      <MDCheckboxGroupError>Choose at least one approval.</MDCheckboxGroupError>
    </MDCheckboxGroup>
  );
}
