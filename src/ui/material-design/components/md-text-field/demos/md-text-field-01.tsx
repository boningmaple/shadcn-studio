import { MDTextField } from "@/ui/material-design/components/md-text-field/md-text-field";

export default function MDTextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <MDTextField label="Full name" supportingText="Use your legal name." />
      <MDTextField
        defaultValue="Ada Lovelace"
        label="Display name"
        supportingText="Visible to collaborators."
      />
      <MDTextField
        errorMessage="Enter a username."
        isInvalid
        label="Username"
      />
      <MDTextField isDisabled label="Account ID" value="acct_8f3k2" />
    </div>
  );
}
