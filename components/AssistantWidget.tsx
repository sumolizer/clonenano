"use client";

import { useRef, useState, type FormEvent } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const CANNED_RESPONSES = [
  "Hey Welcome to naano,\nNaano is a creator platform; this workspace includes cards, opportunities, collaborations, analytics, community, earnings, affiliates, messages, notifications, and account settings.",
  "I'm just a placeholder assistant on this baseline build — on the real thing, I'd help you find creators, check campaign performance, or manage payouts.",
  "This is a demo response. In the live product, this panel would search across creators, campaigns, and analytics for whatever you asked.",
  "Not wired up to anything real yet — but feel free to poke around For companies, For creators, and For agencies while this assistant gets built out.",
];

let nextId = 1;

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const responseIndex = useRef(0);

  function openAndFocus() {
    setOpen(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || thinking) return;

    setMessages((prev) => [...prev, { id: nextId++, role: "user", text }]);
    setDraft("");
    setThinking(true);

    const reply = CANNED_RESPONSES[responseIndex.current % CANNED_RESPONSES.length];
    responseIndex.current += 1;

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId++, role: "assistant", text: reply }]);
      setThinking(false);
    }, 500);
  }

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-xl flex-col items-center">
        {open && (
          <div className="mb-3 flex w-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_16px_44px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <p className="text-sm font-semibold text-[#17181c]">Naano Assistant</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-full p-1 text-[#8a8b90] hover:bg-black/5 hover:text-[#17181c]"
              >
                ✕
              </button>
            </div>

            <div className="flex max-h-80 min-h-[8rem] flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && !thinking && (
                <p className="text-sm text-[#8a8b90]">
                  Ask about creators, campaigns, or your account — this is a demo assistant,
                  so every question gets a generic answer.
                </p>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "self-end max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-sm bg-[#17181c] px-3.5 py-2 text-sm text-white"
                      : "self-start max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-[#f3f3f1] px-3.5 py-2 text-sm text-[#17181c]"
                  }
                >
                  {m.text}
                </div>
              ))}
              {thinking && (
                <div className="self-start rounded-2xl rounded-bl-sm bg-[#f3f3f1] px-3.5 py-2 text-sm text-[#8a8b90]">
                  …
                </div>
              )}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          onFocus={openAndFocus}
          className="flex w-full items-center gap-2 rounded-full border border-black/10 bg-[#f3f3f1] px-2 py-2 shadow-[0_16px_44px_rgba(0,0,0,0.08)]"
        >
          <span className="ml-2 h-4 w-4 shrink-0 rounded-full border-2 border-[#8a8b90] border-t-transparent" aria-hidden />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onFocus={openAndFocus}
            placeholder="What can I help you find?"
            className="flex-1 bg-transparent text-sm text-[#17181c] placeholder:text-[#8a8b90] outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17181c] text-white hover:opacity-90"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}
