import { FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";

import { MDDivider } from "@/ui/material-design/components/md-divider/md-divider";

const files = [
  { icon: FileTextIcon, name: "Project brief", meta: "Updated today" },
  { icon: ImageIcon, name: "Moodboard", meta: "12 images" },
  { icon: VideoIcon, name: "Launch reel", meta: "01:24" },
] as const;

export default function MDDividerDemo() {
  return (
    <div className="w-full max-w-md rounded-[28px] bg-[#fffbfe] py-2 text-[#1d1b20] shadow-sm ring-1 ring-[#cac4d0] dark:bg-[#211f26] dark:text-[#e6e0e9] dark:ring-[#49454f]">
      {files.map(({ icon: Icon, meta, name }, index) => (
        <div key={name}>
          <div className="flex items-center gap-4 px-4 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8def8] text-[#6750a4] dark:bg-[#4a4458] dark:text-[#d0bcff]">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm leading-5 font-medium">{name}</p>
              <p className="truncate text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                {meta}
              </p>
            </div>
          </div>
          {index < files.length - 1 ? <MDDivider inset="start" /> : null}
        </div>
      ))}
    </div>
  );
}
