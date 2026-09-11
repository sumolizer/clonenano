import { Calendar } from "lucide-react";

export default function CreatorCardPreview({ name }: { name: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[10px] font-bold text-[#0a66c2]">
          in
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
          <span className="inline-block h-4 w-4 rounded-full bg-white/90" />
          naano
        </span>
      </div>
      <div className="px-5 pb-5">
        <div className="-mt-7 h-16 w-16 rounded-full border-4 border-white bg-[#c5ebfd]" />
        <p className="mt-3 text-lg font-semibold text-[#17181c]">{name}</p>
        <p className="text-sm text-[#8a8b90]">Software · AI · Sales</p>
        <p className="mt-3 text-sm text-[#3a3b40]">
          Full-stack engineer building B2B products — React, Next.js, Node.js, cloud
          infrastructure.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs text-[#8a8b90]">
          <Calendar className="h-3 w-3" />
          No post data available
        </span>
      </div>
    </div>
  );
}
