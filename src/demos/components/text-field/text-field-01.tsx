import { TextField } from "@/components/text-field/text-field";

export default function TextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <TextField label="Full name" supportingText="Use your legal name." />
      <TextField
        defaultValue="Ada Lovelace"
        label="Display name"
        supportingText="Visible to collaborators."
      />
      <TextField errorMessage="Enter a username." isInvalid label="Username" />
      <TextField isDisabled label="Account ID" value="acct_8f3k2" />
    </div>
  );
}
