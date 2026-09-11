import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQs", href: "/#faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms of Sale & Use", href: "/terms" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free tools", href: "/free-tools" },
      { label: "Case study: BlogSEO", href: "/case-studies/blogseo" },
      { label: "For creators", href: "/creators" },
      { label: "For agencies", href: "/agencies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="max-w-md text-xl font-semibold text-[#17181c]">
          Turn LinkedIn creators into your best acquisition channel.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#3a3b40]">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#17181c]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-[#8a8b90] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} naano clone (audit baseline). Not affiliated with naano.</p>
          <p>Internal baseline build — content is placeholder, pending real copy.</p>
        </div>
      </div>
    </footer>
  );
}
