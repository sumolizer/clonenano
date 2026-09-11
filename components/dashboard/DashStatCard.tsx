import type { LucideIcon } from "lucide-react";

export default function DashStatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold text-[#17181c]">{value}</p>
      <p className="mt-1 text-xs text-[#8a8b90]">{hint}</p>
    </div>
  );
}
