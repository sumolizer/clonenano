import { Inbox } from "lucide-react";

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#17181c]">Messages</h1>
      <p className="mt-2 text-sm text-[#8a8b90]">
        Conversations with brands about collaborations land here.
      </p>

      <div className="mt-8 flex overflow-hidden rounded-2xl border border-black/5 bg-white">
        <div className="w-full max-w-xs shrink-0 border-r border-black/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">Inbox</p>
          <div className="mt-6 flex flex-col items-center gap-2 py-10 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#8a8b90]">
              <Inbox className="h-4 w-4" />
            </span>
            <p className="text-sm text-[#8a8b90]">No conversations yet</p>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center p-10 text-center text-sm text-[#8a8b90] sm:flex">
          Select a conversation to read it here.
        </div>
      </div>
    </div>
  );
}
