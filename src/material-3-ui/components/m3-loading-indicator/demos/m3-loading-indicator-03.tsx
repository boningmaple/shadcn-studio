import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3LoadingIndicator } from "@/material-3-ui/components/m3-loading-indicator/m3-loading-indicator";

export default function M3LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md flex-wrap items-center justify-around gap-6">
      <M3Button isPending>
        <M3LoadingIndicator appearance="inverse" size="xs" />
        <span>Saving changes</span>
      </M3Button>
      <M3Button isPending variant="tonal">
        <M3LoadingIndicator appearance="plain" size="xs" />
        <span>Uploading</span>
      </M3Button>
      <M3Button isPending variant="outlined">
        <M3LoadingIndicator appearance="plain" size="xs" />
        <span>Verifying</span>
      </M3Button>
    </div>
  );
}
