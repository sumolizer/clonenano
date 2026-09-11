"use client";

import Link from "next/link";
import { Eye, FileText, Activity, Users2, CheckCircle2, ChevronRight, Share2, Copy, IdCard } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/DashboardUserContext";
import DashStatCard from "@/components/dashboard/DashStatCard";
import CreatorCardPreview from "@/components/dashboard/CreatorCardPreview";

export default function DashboardOverviewPage() {
  const user = useDashboardUser();
  const firstName = user.name.split(" ")[0];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
        Creator workspace
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-[#17181c]">Good to see you, {firstName}</h1>
      <p className="mt-2 text-sm text-[#8a8b90]">Your creator activity, at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashStatCard icon={Eye} label="Public post reach" value="—" hint="Waiting for public post data" />
        <DashStatCard icon={FileText} label="Public posts" value="0" hint="Original LinkedIn posts found" />
        <DashStatCard icon={Activity} label="Public engagements" value="0" hint="Reactions, comments and reposts" />
        <DashStatCard icon={Users2} label="LinkedIn followers" value="982" hint="Imported from the public profile" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[#17181c]">Your creator card</h2>
              <p className="mt-1 text-sm text-[#8a8b90]">
                This is how brands discover your positioning and collaboration offer.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2">
              <Link
                href="/dashboard/card"
                className="flex items-center justify-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-[#17181c] hover:bg-black/5"
              >
                <IdCard className="h-3.5 w-3.5" />
                Open card
              </Link>
              <button className="flex items-center justify-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-[#17181c] hover:bg-black/5">
                <Copy className="h-3.5 w-3.5" />
                Copy card link
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-full bg-[#17181c] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90">
                <Share2 className="h-3.5 w-3.5" />
                Share my card
              </button>
            </div>
          </div>

          <div className="mt-5">
            <CreatorCardPreview name={user.name} />
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#17181c]">Your launch guide</h2>
              <p className="mt-1 text-sm text-[#8a8b90]">1 of 1 steps complete</p>
            </div>
            <Link href="/dashboard/card" className="text-sm font-semibold text-[#2563eb]">
              Open card
            </Link>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-black/5 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="font-medium text-[#17181c]">Card and price ready</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Complete
              </span>
              <ChevronRight className="h-4 w-4 text-[#8a8b90]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
