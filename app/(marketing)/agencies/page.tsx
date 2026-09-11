import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";

const PATHS = [
  {
    step: "01",
    title: "Brand agency",
    subtitle: "I manage campaigns for companies",
    body: "Operate separate client workspaces, budgets, campaigns and reporting from one portfolio.",
    bullets: [
      "Create one workspace per client",
      "Add and allocate client budgets",
      "Track campaigns and next actions",
    ],
    cta: "Create a brand agency workspace",
    note: "You'll create the agency manager account first.",
    href: "/register?agency=brand",
  },
  {
    step: "02",
    title: "Creator agency",
    subtitle: "I represent and manage creators",
    body: "Import your roster, manage every profile and run collaborations without creator logins.",
    bullets: [
      "Import any creator roster (CSV)",
      "Manage rates and creator profiles",
      "Track collaborations and earnings",
    ],
    cta: "Create a creator agency workspace",
    note: "Your creators do not need individual accounts.",
    href: "/register?agency=creator",
  },
];

export default function AgenciesPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#c5ebfd] to-[#fcfcfb] px-6 pb-20 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-[#3a3b40]">
            For agencies
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[#17181c] sm:text-5xl">
            Choose the workspace that matches your agency.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#3a3b40]">
            Brand operations and creator management are kept separate. Choose your setup
            and create the right workspace for your agency.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            Two distinct products
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#17181c] sm:text-3xl">
            What does your agency manage?
          </h2>

          <RevealOnScroll stagger={0.12} className="mt-10 grid gap-6 sm:grid-cols-2">
            {PATHS.map((path) => (
              <div key={path.title} className="rounded-3xl border border-black/5 bg-white p-8">
                <span className="text-xs font-semibold text-[#8a8b90]">{path.step}</span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
                  {path.title}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-[#17181c]">{path.subtitle}</h3>
                <p className="mt-3 text-sm text-[#3a3b40]">{path.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-[#3a3b40]">
                  {path.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <Link
                  href={path.href}
                  className="mt-8 block rounded-full bg-[#17181c] px-5 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90"
                >
                  {path.cta}
                </Link>
                <p className="mt-3 text-center text-xs text-[#8a8b90]">{path.note}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll className="bg-white px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
          Talk to us
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold text-[#17181c] sm:text-3xl">
          Not sure which workspace fits your agency?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-[#3a3b40]">
          Book a short agency call — we&apos;ll look at how you manage clients or creators
          and point you to the right setup.
        </p>
        <div className="mt-8">
          <Link
            href="/register"
            className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#17181c] hover:bg-black/5"
          >
            Book a call
          </Link>
        </div>
      </RevealOnScroll>
    </div>
  );
}
