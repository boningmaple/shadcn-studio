import { Divider } from "@/components/divider/divider";

const sections = [
  { title: "Today", detail: "3 new updates" },
  { title: "This week", detail: "12 conversations" },
  { title: "Archive", detail: "48 saved items" },
] as const;

export default function DividerDemo() {
  return (
    <div className="w-full max-w-md rounded-[28px] bg-[#fffbfe] py-2 text-[#1d1b20] shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:text-[#e6e0e9] dark:ring-[#49454f]">
      {sections.map((section, index) => (
        <div key={section.title}>
          <div className="px-6 py-4">
            <p className="text-sm leading-5 font-medium">{section.title}</p>
            <p className="mt-1 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              {section.detail}
            </p>
          </div>
          {index < sections.length - 1 ? <Divider /> : null}
        </div>
      ))}
    </div>
  );
}
