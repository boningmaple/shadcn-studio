import { M3TextArea } from "@/material-3-ui/components/m3-text-field/m3-text-field";

export default function M3TextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <M3TextArea
        supportingText="Tell us what you plan to build with this library."
        label="Project description"
      />
      <M3TextArea
        defaultValue="A gallery of Material 3 components built with React Aria and Tailwind CSS."
        errorMessage="Keep the summary under 280 characters."
        isInvalid
        label="Short summary"
        rows={3}
        variant="outlined"
      />
    </div>
  );
}
