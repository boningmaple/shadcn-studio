import {
  M3TextArea,
  M3TextField,
} from "@/material-3-ui/components/m3-text-field/m3-text-field";

export default function M3TextFieldDemo() {
  return (
    <form
      className="grid w-full max-w-md gap-6 rounded-[28px] bg-[#fffbfe] p-6 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <M3TextField isRequired label="First name" validationBehavior="aria" />
        <M3TextField isRequired label="Last name" validationBehavior="aria" />
      </div>
      <M3TextField
        isRequired
        label="Email address"
        supportingText="We will send the invite to this address."
        type="email"
        validationBehavior="aria"
        variant="outlined"
      />
      <M3TextField label="Team size" suffix="members" type="number" />
      <M3TextArea
        label="Team notes"
        supportingText="Optional, but recommended for bigger teams."
      />
    </form>
  );
}
