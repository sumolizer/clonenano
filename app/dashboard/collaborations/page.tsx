const TABS = [
  { label: "All", count: 0 },
  { label: "Active", count: 0 },
  { label: "Needs action", count: 0 },
  { label: "Applications sent", count: 0 },
  { label: "Declined", count: 0 },
  { label: "Completed", count: 0 },
];

const COLUMNS = ["Brand", "Campaign", "Status", "Performance", "Next action", "Due date", "Your net"];

export default function CollaborationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#17181c]">Collaborations</h1>
      <p className="mt-2 text-sm text-[#8a8b90]">
        Every step tells you where you stand, what to do, and what happens if you do
        nothing.
      </p>

      <div className="mt-6 flex flex-wrap gap-6 border-b border-black/5 text-sm">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            className={
              i === 0
                ? "flex items-center gap-2 border-b-2 border-[#2563eb] pb-3 font-semibold text-[#2563eb]"
                : "flex items-center gap-2 pb-3 text-[#8a8b90] hover:text-[#17181c]"
            }
          >
            {tab.label}
            <span
              className={
                i === 0
                  ? "rounded-full bg-[#2563eb] px-2 py-0.5 text-xs font-semibold text-white"
                  : "rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-[#8a8b90]"
              }
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-[#8a8b90]">
              {COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={COLUMNS.length} className="px-5 py-10 text-center text-[#8a8b90]">
                No collaborations yet. Brand invitations and your accepted applications
                land here.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-black/5 px-5 py-3 text-sm text-[#8a8b90]">
          <span>0 collaborations</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eef6fc] text-xs font-semibold text-[#2563eb]">
            1
          </span>
        </div>
      </div>
    </div>
  );
}
