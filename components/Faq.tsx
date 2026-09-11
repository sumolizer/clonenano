"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="font-medium text-[#17181c]">{item.question}</span>
              <span className="ml-4 text-[#8a8b90]">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <p className="px-5 pb-4 text-sm text-[#3a3b40]">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
