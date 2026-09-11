import Link from "next/link";
import Faq from "@/components/Faq";
import Stat from "@/components/Stat";
import CreatorPostCard, { type CreatorPost } from "@/components/CreatorPostCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { hasSessionCookie } from "@/lib/session";

const SAMPLE_POSTS: CreatorPost[] = [
  {
    name: "Alex Rivera",
    title: "Creator · B2B & AI · 34K followers",
    hook: "How AI changed the way our sales team prioritizes leads.",
    impressions: "42.8K",
    clicks: "312",
    leads: "18",
  },
  {
    name: "Jordan Kim",
    title: "Creator · Sales & AI · 12K followers",
    hook: "I run my entire prospecting workflow through an AI agent. Here's how.",
    impressions: "9K",
    clicks: "100",
    leads: "50",
  },
  {
    name: "Morgan Diaz",
    title: "Sales Leader · B2B · 40K followers",
    hook: "Most sales teams waste 80% of their time on the wrong leads.",
    impressions: "20K",
    clicks: "350",
    leads: "80",
  },
  {
    name: "Sam Okafor",
    title: "Content Creator · B2B · 34K followers",
    hook: "My 30-day LinkedIn content system, the exact playbook.",
    impressions: "100K",
    clicks: "1,600",
    leads: "320",
  },
];

const FEATURES = [
  { title: "Centralized opportunities", body: "Discover brand deals that match your audience." },
  { title: "Payments built-in", body: "Get paid on time with secure, transparent payouts." },
  { title: "Track performance", body: "See views, clicks and engagement in real time." },
  { title: "Easy delivery", body: "Manage deals and deliver content with ease." },
];

const TESTIMONIALS = [
  {
    quote:
      "The founders truly listen and do everything they can to build something that brings real value to creators.",
    name: "Riley Chen",
    title: "B2B creator · 18K followers",
  },
  {
    quote:
      "At first I wasn't sure what to expect, but the experience was simple: clear opportunities, an easy platform, everything well guided.",
    name: "Priya Anand",
    title: "Content creator · 9K followers",
  },
  {
    quote: "Simple and efficient, the team is responsive, and results come fast.",
    name: "Jordan Kim",
    title: "Sales creator · 14K followers",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is it free for creators?",
    answer: "Yes, joining is free and there's no exclusivity requirement.",
  },
  {
    question: "How much can I earn?",
    answer: "Rates are set by you per post; average deals are in the hundreds of euros range.",
  },
  {
    question: "How and when do I get paid?",
    answer: "Payouts are triggered once a post goes live, typically within 24 hours.",
  },
  {
    question: "Do I have to sign an exclusivity contract?",
    answer: "No — you can work with as many brands as you want, on your own terms.",
  },
  {
    question: "Do I keep control of my content?",
    answer: "Yes, you write and post in your own voice; brands provide guidelines, not scripts.",
  },
];

export default async function CreatorsPage() {
  const ctaHref = (await hasSessionCookie()) ? "/dashboard" : "/register";

  return (
    <div>
      <section className="bg-gradient-to-b from-[#c5ebfd] to-[#fcfcfb] px-6 pb-24 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-[#3a3b40]">
            2,000+ creators paid · 4.8/5 rating
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-[#17181c] sm:text-6xl">
            Get paid to post on LinkedIn
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#3a3b40]">
            Choose deals from B2B brands you know, post in your own voice, and get paid
            fast. No negotiating, no admin.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaHref}
              className="rounded-full bg-[#17181c] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Start earning →
            </Link>
            <Link href="#how-it-works" className="text-sm font-semibold text-[#17181c] underline">
              See how it works →
            </Link>
          </div>
          <p className="mt-10 text-xs uppercase tracking-wide text-[#5a5b60]">
            Free to join · No exclusivity · Fast payouts
          </p>
        </div>
      </section>

      <section id="how-it-works" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
              The platform
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#17181c] sm:text-4xl">
              For creators who don&apos;t want the administrative burden.
            </h2>
            <p className="mt-3 text-[#3a3b40]">
              Find deals, get paid, and track your performance from one dashboard. No
              invoicing, no chasing, no spreadsheets.
            </p>
          </div>

          <RevealOnScroll stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-black/5 p-5">
                <p className="font-semibold text-[#17181c]">{f.title}</p>
                <p className="mt-2 text-sm text-[#3a3b40]">{f.body}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 py-20">
        <RevealOnScroll stagger={0.1} className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-4">
          <Stat value="2,000+" label="Creators earning" />
          <Stat value="€500" label="Avg. per deal" />
          <Stat value="5K+" label="Posts published" />
          <Stat value="24h" label="Avg. payout time" />
        </RevealOnScroll>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-semibold text-[#17181c]">Real posts from real creators.</h2>
          <RevealOnScroll stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_POSTS.map((post) => (
              <CreatorPostCard key={post.name} post={post} />
            ))}
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            From the community
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#17181c]">What creators say.</h2>
          <RevealOnScroll stagger={0.1} className="mt-10 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-black/5 bg-white p-6">
                <p className="text-sm text-[#3a3b40]">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-[#17181c]">{t.name}</p>
                <p className="text-xs text-[#8a8b90]">{t.title}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      <section id="faq" className="bg-white px-6 py-20">
        <RevealOnScroll className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
            Frequently asked questions
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#17181c]">
            Everything you need to know before you start earning.
          </h2>
          <div className="mt-8">
            <Faq items={FAQ_ITEMS} />
          </div>
        </RevealOnScroll>
      </section>

      <RevealOnScroll className="px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8b90]">
          Ready to earn?
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold text-[#17181c] sm:text-4xl">
          You&apos;ve seen how it works. Now get paid for it.
        </h2>
        <div className="mt-8">
          <Link
            href={ctaHref}
            className="rounded-full bg-[#17181c] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Apply now
          </Link>
        </div>
      </RevealOnScroll>
    </div>
  );
}
