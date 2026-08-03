import { MDTextArea } from "@/ui/material-design/components/md-text-field/md-text-field";

export default function MDTextFieldDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <MDTextArea
        supportingText="Tell us what you plan to build with this library."
        label="Project description"
      />
      <MDTextArea
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
