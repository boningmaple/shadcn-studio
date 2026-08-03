import * as React from "react";

import { M3LinearProgressIndicator } from "@/material-3-ui/components/m3-progress-indicator/m3-progress-indicator";

export default function M3ProgressIndicatorDemo() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 1));
    }, 80);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <M3LinearProgressIndicator value={progress}>
        Downloading update
      </M3LinearProgressIndicator>
      <M3LinearProgressIndicator
        aria-label="Downloading update"
        value={progress}
      />
    </div>
  );
}
