import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDLoadingIndicator } from "@/ui/material-design/components/md-loading-indicator/md-loading-indicator";

export default function MDLoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md flex-wrap items-center justify-around gap-6">
      <MDButton isPending>
        <MDLoadingIndicator appearance="inverse" size="xs" />
        <span>Saving changes</span>
      </MDButton>
      <MDButton isPending variant="tonal">
        <MDLoadingIndicator appearance="plain" size="xs" />
        <span>Uploading</span>
      </MDButton>
      <MDButton isPending variant="outlined">
        <MDLoadingIndicator appearance="plain" size="xs" />
        <span>Verifying</span>
      </MDButton>
    </div>
  );
}
