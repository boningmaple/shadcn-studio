import { MDDivider } from "@/ui/material-design/components/md-divider/md-divider";

export default function MDDividerDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 rounded-[28px] bg-[#fffbfe] p-5 text-[#1d1b20] shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:text-[#e6e0e9] dark:ring-[#49454f] sm:grid-cols-[1fr_auto_1fr]">
      <section className="min-w-0">
        <p className="text-sm leading-5 font-medium">Primary account</p>
        <p className="mt-2 text-sm leading-6 text-[#49454f] dark:text-[#cac4d0]">
          Payment, invoices, and subscriptions stay grouped here.
        </p>
      </section>
      <MDDivider
        className="hidden sm:block"
        inset="both"
        orientation="vertical"
      />
      <MDDivider className="sm:hidden" />
      <section className="min-w-0">
        <p className="text-sm leading-5 font-medium">Workspace account</p>
        <p className="mt-2 text-sm leading-6 text-[#49454f] dark:text-[#cac4d0]">
          Team access, invites, and shared resources live separately.
        </p>
      </section>
    </div>
  );
}
