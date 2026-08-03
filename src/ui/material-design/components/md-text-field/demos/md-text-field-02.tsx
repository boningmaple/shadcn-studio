import { MDTextField } from "@/ui/material-design/components/md-text-field/md-text-field";

export default function MDTextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <MDTextField
        label="Email address"
        supportingText="We will only use this for account recovery."
        variant="outlined"
      />
      <MDTextField
        defaultValue="hello@example.com"
        label="Work email"
        variant="outlined"
      />
      <MDTextField
        errorMessage="Enter a valid email."
        isInvalid
        label="Recovery email"
        variant="outlined"
      />
      <MDTextField isDisabled label="Team" value="Design" variant="outlined" />
    </div>
  );
}
