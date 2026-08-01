import { TextField } from "@/components/text-field/text-field";

export default function TextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <TextField
        label="Email address"
        supportingText="We will only use this for account recovery."
        variant="outlined"
      />
      <TextField
        defaultValue="hello@example.com"
        label="Work email"
        variant="outlined"
      />
      <TextField
        errorMessage="Enter a valid email."
        isInvalid
        label="Recovery email"
        variant="outlined"
      />
      <TextField isDisabled label="Team" value="Design" variant="outlined" />
    </div>
  );
}
