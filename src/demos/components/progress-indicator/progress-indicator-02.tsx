import * as React from "react";

import { LinearProgressIndicator } from "@/components/progress-indicator/progress-indicator";

export default function ProgressIndicatorDemo() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 1));
    }, 80);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <LinearProgressIndicator value={progress}>
        Downloading update
      </LinearProgressIndicator>
      <LinearProgressIndicator
        aria-label="Downloading update"
        value={progress}
      />
    </div>
  );
}
