"use client";

import { Hash, ExternalLink } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/DashboardUserContext";
import CreatorCardPreview from "@/components/dashboard/CreatorCardPreview";

export default function CommunityPage() {
  const user = useDashboardUser();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#17181c]">Community</h1>
          <p className="mt-2 max-w-lg text-sm text-[#8a8b90]">
            Learn with other B2B creators, share what works and make your Naano identity
            visible.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Creator network
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4a154b]/10 text-[#4a154b]">
            <Hash className="h-6 w-6" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            Naano creators on Slack
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#17181c]">
            The room where B2B creators get better together.
          </h2>
          <p className="mt-2 text-sm text-[#8a8b90]">
            Ask for feedback on a sponsored post, compare campaign lessons, meet creators
            in your language and help shape what Naano builds next.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-[#3a3b40]">
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </span>
              Get feedback before you publish
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </span>
              Share campaign tips that work
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </span>
              Talk directly with the Naano team
            </li>
          </ul>

          <button className="mt-5 flex w-full items-center justify-between rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-[#17181c] hover:bg-black/5">
            <span className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Join the Slack community
            </span>
            <ExternalLink className="h-4 w-4 text-[#8a8b90]" />
          </button>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a66c2]/10 text-[#0a66c2] text-sm font-bold">
            in
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            LinkedIn visibility
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#17181c]">
            Turn your LinkedIn profile into an always-on Deal Link
          </h2>
          <p className="mt-2 text-sm text-[#8a8b90]">
            Add your creator card to LinkedIn so brands can discover your work and join
            Naano through your attributed link.
          </p>

          <div className="mt-4 flex items-center gap-4 rounded-xl bg-[#eef6fc] p-4">
            <div>
              <p className="text-2xl font-semibold text-[#17181c]">25%</p>
              <p className="text-xs text-[#8a8b90]">of Naano&apos;s commission for 3 months</p>
            </div>
            <p className="text-xs text-[#3a3b40]">
              Leave your card on your LinkedIn profile. If a brand joins Naano through it,
              your reward is tracked automatically.
            </p>
          </div>

          <div className="mt-5">
            <CreatorCardPreview name={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
