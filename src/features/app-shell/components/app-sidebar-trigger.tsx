import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";

type AppSidebarTriggerProps = {
  className?: string;
};

export default function AppSidebarTrigger(props: AppSidebarTriggerProps) {
  return <SidebarTrigger size="icon" className={cn("transition-none", props.className)} />;
}
