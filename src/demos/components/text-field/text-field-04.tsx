import { TextArea } from "@/components/text-field/text-field";

export default function TextFieldDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <TextArea
        description="Tell us what you plan to build with this library."
        label="Project description"
      />
      <TextArea
        defaultValue="A gallery of Material 3 components built with React Aria and Tailwind CSS."
        errorMessage="Keep the summary under 280 characters."
        isInvalid
        label="Short summary"
        variant="outlined"
      />
    </div>
  );
}
