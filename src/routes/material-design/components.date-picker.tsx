import { createFileRoute } from "@tanstack/react-router";

import DatePicker01 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-01";
import DatePicker02 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-02";
import DatePicker03 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-03";
import DatePicker04 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/date-picker")(
  {
    component: DatePickerComponentPage,
  },
);

function DatePickerComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="date-picker" />
  );
}

const demoComponents: DemoComponents<"date-picker"> = {
  "01": DatePicker01,
  "02": DatePicker02,
  "03": DatePicker03,
  "04": DatePicker04,
};
