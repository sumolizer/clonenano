import { Lock } from "lucide-react";

const FOLLOWER_THRESHOLD = 1000;
const MOCK_FOLLOWERS = 982;

export default function OpportunitiesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#17181c]">Opportunities</h1>
      <p className="mt-2 text-sm text-[#8a8b90]">
        Open brand campaigns — apply, the brand accepts, and the booking is created on
        your terms.
      </p>

      <div className="mt-10 flex max-w-md flex-col items-center rounded-2xl border border-black/5 bg-white p-10 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#8a8b90]">
          <Lock className="h-4 w-4" />
        </span>
        <p className="mt-4 font-semibold text-[#17181c]">
          Paid campaigns open at {FOLLOWER_THRESHOLD.toLocaleString()} followers
        </p>
        <p className="mt-2 text-sm text-[#8a8b90]">
          You have {MOCK_FOLLOWERS} followers. Keep posting and come back — re-check your
          count once a week from Settings.
        </p>
      </div>
    </div>
  );
}
