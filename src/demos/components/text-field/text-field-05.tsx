import { TextArea, TextField } from "@/components/text-field/text-field";

export default function TextFieldDemo() {
  return (
    <form
      className="grid w-full max-w-md gap-6 rounded-[28px] bg-[#fffbfe] p-6 shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:ring-[#49454f]"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField isRequired label="First name" validationBehavior="aria" />
        <TextField isRequired label="Last name" validationBehavior="aria" />
      </div>
      <TextField
        isRequired
        label="Email address"
        supportingText="We will send the invite to this address."
        type="email"
        validationBehavior="aria"
        variant="outlined"
      />
      <TextField label="Team size" suffix="members" type="number" />
      <TextArea
        label="Team notes"
        supportingText="Optional, but recommended for bigger teams."
      />
    </form>
  );
}
