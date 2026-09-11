import { Percent, Users2, Wallet, Copy } from "lucide-react";
import DashStatCard from "@/components/dashboard/DashStatCard";

export default function AffiliateProgramPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#17181c]">Affiliate program</h1>
      <p className="mt-2 max-w-lg text-sm text-[#8a8b90]">
        Refer other creators or brands to Naano and earn a share of what they bring in —
        separate from your own Deal Link commission.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <DashStatCard icon={Users2} label="Referred signups" value="0" hint="Brands and creators via your link" />
        <DashStatCard icon={Percent} label="Your rate" value="10%" hint="Of referred revenue, first 6 months" />
        <DashStatCard icon={Wallet} label="Affiliate earnings" value="€0" hint="Paid out with your regular earnings" />
      </div>

      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="font-semibold text-[#17181c]">Your referral link</h2>
        <p className="mt-1 text-sm text-[#8a8b90]">
          Anyone who signs up through this link is tracked automatically — no code needed.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value="naano.com/r/your-handle"
            className="flex-1 rounded-full border border-black/10 bg-black/[0.02] px-4 py-2.5 text-sm text-[#3a3b40]"
          />
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#17181c] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            <Copy className="h-4 w-4" />
            Copy link
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="font-semibold text-[#17181c]">Referral activity</h2>
        <div className="mt-6 flex flex-col items-center py-8 text-center">
          <p className="font-medium text-[#17181c]">No referrals yet</p>
          <p className="mt-1 text-sm text-[#8a8b90]">
            Share your link — signups and their status will show up here.
          </p>
        </div>
      </div>
    </div>
  );
}
