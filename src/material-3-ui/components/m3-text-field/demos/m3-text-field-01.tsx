import { M3TextField } from "@/material-3-ui/components/m3-text-field/m3-text-field";

export default function M3TextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <M3TextField label="Full name" supportingText="Use your legal name." />
      <M3TextField
        defaultValue="Ada Lovelace"
        label="Display name"
        supportingText="Visible to collaborators."
      />
      <M3TextField
        errorMessage="Enter a username."
        isInvalid
        label="Username"
      />
      <M3TextField isDisabled label="Account ID" value="acct_8f3k2" />
    </div>
  );
}
