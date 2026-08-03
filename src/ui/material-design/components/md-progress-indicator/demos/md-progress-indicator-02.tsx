import * as React from "react";

import { MDLinearProgressIndicator } from "@/ui/material-design/components/md-progress-indicator/md-progress-indicator";

export default function MDProgressIndicatorDemo() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 1));
    }, 80);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <MDLinearProgressIndicator value={progress}>
        Downloading update
      </MDLinearProgressIndicator>
      <MDLinearProgressIndicator
        aria-label="Downloading update"
        value={progress}
      />
    </div>
  );
}
