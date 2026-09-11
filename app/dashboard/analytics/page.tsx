import { FileText, Eye, Activity, Users2, ShieldCheck } from "lucide-react";
import DashStatCard from "@/components/dashboard/DashStatCard";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#17181c]">Analytics</h1>
          <p className="mt-2 text-sm text-[#8a8b90]">
            Public LinkedIn performance imported for this profile.
          </p>
        </div>
        <select className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#17181c]">
          <option>All time</option>
        </select>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-r from-[#eef6fc] to-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Public LinkedIn snapshot
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#17181c]">
              Public LinkedIn posts are being imported
            </h2>
            <p className="mt-1 text-sm text-[#8a8b90]">
              The profile is ready. Post history and reach will appear after the
              public-data job completes.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-[#17181c]">0%</p>
            <p className="text-xs text-[#8a8b90]">of imported posts include reach data</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#8a8b90]">
              No public post found yet
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashStatCard icon={FileText} label="Public posts" value="0" hint="Original LinkedIn posts found" />
        <DashStatCard icon={Eye} label="Public post reach" value="Pending" hint="Waiting for public post data" />
        <DashStatCard icon={Activity} label="Public engagements" value="0" hint="Reactions, comments and reposts" />
        <DashStatCard icon={Users2} label="LinkedIn followers" value="982" hint="Imported from the public profile" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="font-semibold text-[#17181c]">Recent LinkedIn posts</h2>
          <p className="mt-1 text-sm text-[#8a8b90]">Open the original post on LinkedIn.</p>
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            <p className="font-medium text-[#17181c]">Public post import in progress</p>
            <p className="mt-1 text-sm text-[#8a8b90]">
              The first public LinkedIn posts will appear here automatically.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="font-semibold text-[#17181c]">Public profile summary</h2>
          <p className="mt-1 text-sm text-[#8a8b90]">
            Automatically collected from public LinkedIn data.
          </p>
          <div className="mt-5 space-y-4">
            {[
              { label: "LinkedIn followers", value: 982, max: 1000 },
              { label: "Public posts", value: 0, max: 1000 },
              { label: "Public engagements", value: 0, max: 1000 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#3a3b40]">{row.label}</span>
                  <span className="font-semibold text-[#17181c]">{row.value}</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-black/5">
                  <div
                    className="h-1.5 rounded-full bg-[#2563eb]"
                    style={{ width: `${Math.min(100, (row.value / row.max) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#2563eb]">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#17181c]">Public LinkedIn data is being prepared</p>
          <p className="text-xs text-[#8a8b90]">
            Naano is collecting the creator&apos;s recent public posts and engagement.
          </p>
        </div>
      </div>
    </div>
  );
}
