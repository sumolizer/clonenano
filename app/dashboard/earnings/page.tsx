"use client";

import { useState } from "react";
import { TrendingUp, ArrowDownToLine, Wallet, Landmark, CreditCard } from "lucide-react";

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sept"];

export default function EarningsPage() {
  const [payoutMethod, setPayoutMethod] = useState<"bank" | "stripe">("stripe");

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#17181c]">Earnings</h1>
          <p className="mt-2 text-sm text-[#8a8b90]">
            Track revenue from your paid collaborations and withdraw available funds.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-[#3a3b40]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
          Paid collaborations
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-[#eef6fc] to-white p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            <TrendingUp className="h-3.5 w-3.5" />
            Total earned
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#17181c]">€0</p>
          <p className="mt-1 text-xs text-[#8a8b90]">0 paid collaborations · €0 average</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            <ArrowDownToLine className="h-3.5 w-3.5" />
            In transit
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#17181c]">€0</p>
          <p className="mt-1 text-xs text-[#8a8b90]">
            International transfers usually arrive within 1–7 days, depending on the
            destination and banking network.
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            <Wallet className="h-3.5 w-3.5" />
            Available now
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#17181c]">€0</p>
          <p className="mt-1 text-xs text-[#8a8b90]">Ready to withdraw to your selected payout method.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#17181c]">Earnings over time</h2>
            <span className="text-xs text-[#8a8b90]">€0 over 6 months</span>
          </div>
          <p className="mt-1 text-sm text-[#8a8b90]">Net collaboration earnings from the last six months.</p>

          <div className="mt-6 flex items-end justify-between gap-3">
            {MONTHS.map((month, i) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-[#8a8b90]">€0</span>
                <div
                  className={
                    i === MONTHS.length - 1
                      ? "w-full rounded-t-md bg-[#2563eb]"
                      : "w-full rounded-t-md bg-black/10"
                  }
                  style={{ height: "80px" }}
                />
                <span className="text-xs text-[#8a8b90]">{month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="font-semibold text-[#17181c]">Withdraw earnings</h2>
          <p className="mt-1 text-sm text-[#8a8b90]">Choose where your available balance should be sent.</p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">Payout method</p>
          <div className="mt-2 space-y-2">
            <button
              onClick={() => setPayoutMethod("bank")}
              className={
                payoutMethod === "bank"
                  ? "flex w-full items-start gap-3 rounded-xl border-2 border-[#2563eb] p-4 text-left"
                  : "flex w-full items-start gap-3 rounded-xl border border-black/10 p-4 text-left"
              }
            >
              <Landmark className="mt-0.5 h-4 w-4 text-[#3a3b40]" />
              <div>
                <p className="text-sm font-semibold text-[#17181c]">Bank transfer</p>
                <p className="text-xs text-[#8a8b90]">No account holder on file · No bank details on file</p>
                <span className="mt-2 inline-block rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#17181c]">
                  Edit
                </span>
              </div>
            </button>

            <button
              onClick={() => setPayoutMethod("stripe")}
              className={
                payoutMethod === "stripe"
                  ? "flex w-full items-start gap-3 rounded-xl border-2 border-[#2563eb] bg-[#eef6fc] p-4 text-left"
                  : "flex w-full items-start gap-3 rounded-xl border border-black/10 p-4 text-left"
              }
            >
              <CreditCard className="mt-0.5 h-4 w-4 text-[#3a3b40]" />
              <div>
                <p className="text-sm font-semibold text-[#17181c]">Stripe</p>
                <p className="text-xs text-[#8a8b90]">Status: Not connected · Instant transfer to your connected Stripe account.</p>
                <span className="mt-2 inline-block rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-[#17181c]">
                  Connect Stripe
                </span>
              </div>
            </button>
          </div>

          <div className="mt-5 flex gap-2">
            <input
              type="text"
              placeholder="€ Amount"
              className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-[#17181c]"
            />
            <button className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold text-[#17181c] hover:bg-black/5">
              Withdraw all
            </button>
          </div>
          <button className="mt-3 w-full rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            Confirm withdrawal
          </button>
          <p className="mt-3 text-xs text-[#8a8b90]">No earnings are currently waiting for release.</p>
        </div>
      </div>
    </div>
  );
}
