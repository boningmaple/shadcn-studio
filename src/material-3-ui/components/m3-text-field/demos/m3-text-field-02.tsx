import { M3TextField } from "@/material-3-ui/components/m3-text-field/m3-text-field";

export default function M3TextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <M3TextField
        label="Email address"
        supportingText="We will only use this for account recovery."
        variant="outlined"
      />
      <M3TextField
        defaultValue="hello@example.com"
        label="Work email"
        variant="outlined"
      />
      <M3TextField
        errorMessage="Enter a valid email."
        isInvalid
        label="Recovery email"
        variant="outlined"
      />
      <M3TextField isDisabled label="Team" value="Design" variant="outlined" />
    </div>
  );
}
