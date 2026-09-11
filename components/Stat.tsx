export default function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-semibold text-[#17181c] sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-[#3a3b40]">{label}</p>
    </div>
  );
}
