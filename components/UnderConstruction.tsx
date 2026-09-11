import Link from "next/link";

export default function UnderConstruction({
  eyebrow = "Coming soon",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-gradient-to-b from-[#c5ebfd] to-[#fcfcfb] px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-2xl">
          🚧
        </span>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-[#3a3b40]">
          {eyebrow}
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[#17181c] sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-[#3a3b40]">
          {description ??
            "Site under construction — this page isn't built yet. Check back soon, or head somewhere that already works."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#17181c] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Back to home
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold text-[#17181c] underline"
          >
            Start for free →
          </Link>
        </div>
      </div>
    </div>
  );
}
