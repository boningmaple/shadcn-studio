import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Button01() {
  const [count, setCount] = useState(0);

  return (
    <Button onPress={() => setCount(count + 1)}>
      Get started, {count}
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  );
}
