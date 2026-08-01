import { Button } from "@/components/button/button";
import { LoadingIndicator } from "@/components/loading-indicator/loading-indicator";

export default function LoadingIndicatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-around gap-6">
      <Button isPending>
        <LoadingIndicator size="xs" />
        <span>Saving changes</span>
      </Button>
      <Button isPending variant="tonal">
        <LoadingIndicator size="xs" />
        <span>Uploading</span>
      </Button>
      <Button isPending variant="outlined">
        <LoadingIndicator size="xs" />
        <span>Verifying</span>
      </Button>
    </div>
  );
}
