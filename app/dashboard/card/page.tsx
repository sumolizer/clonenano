"use client";

import { Briefcase, Send, Share2 } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/DashboardUserContext";
import CreatorCardPreview from "@/components/dashboard/CreatorCardPreview";

export default function MyCardPage() {
  const user = useDashboardUser();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            Your creator storefront
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#17181c]">
            Your Naano card, ready to travel.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#8a8b90]">
            Share clear proof of your positioning, audience and offers. Every improvement
            makes the card more useful to brands.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#17181c] hover:bg-black/5">
            Edit
          </button>
          <button className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#17181c] hover:bg-black/5">
            Preview
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-black/5 bg-gradient-to-b from-[#eef6fc] to-white p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
              Your card is your deal link
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#17181c]">
              Put it on LinkedIn. Earn when a brand joins through it.
            </h2>
            <p className="mt-3 text-sm text-[#3a3b40]">
              Your public card presents your profile and keeps you selected when a brand
              creates its account.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#2563eb]">
                  <Briefcase className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#17181c]">
                    Add it as a LinkedIn experience
                  </p>
                  <p className="mt-1 text-xs text-[#8a8b90]">
                    Keep your card visible on your profile so brands can discover and book
                    you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#2563eb]">
                  <Send className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#17181c]">
                    Send it when a brand contacts you
                  </p>
                  <p className="mt-1 text-xs text-[#8a8b90]">
                    When you receive a collaboration request, share your card so the deal
                    runs through Naano.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-6 flex items-center gap-2 rounded-full bg-[#17181c] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
              <Share2 className="h-4 w-4" />
              Copy or share my Deal Link
            </button>
          </div>

          <div className="flex shrink-0 gap-8 lg:flex-col">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
                Your share
              </p>
              <p className="mt-1 text-3xl font-semibold text-[#17181c]">25%</p>
            </div>
            <div className="border-t border-black/5 pt-4 lg:pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
                Reward period
              </p>
              <p className="mt-1 text-lg font-semibold text-[#17181c]">3 months</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-md">
        <CreatorCardPreview name={user.name} />
      </div>
    </div>
  );
}
