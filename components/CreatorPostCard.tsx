export interface CreatorPost {
  name: string;
  title: string;
  hook: string;
  impressions: string;
  clicks: string;
  leads: string;
}

export default function CreatorPostCard({ post }: { post: CreatorPost }) {
  return (
    <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 rounded-full bg-[#c5ebfd]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-[#17181c]">{post.name}</p>
          <p className="text-xs text-[#8a8b90]">{post.title}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#3a3b40]">{post.hook}</p>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-black/5 pt-4 text-center">
        <div>
          <p className="text-sm font-semibold text-[#17181c]">{post.impressions}</p>
          <p className="text-[11px] text-[#8a8b90]">Impressions</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#17181c]">{post.clicks}</p>
          <p className="text-[11px] text-[#8a8b90]">Clicks</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#17181c]">{post.leads}</p>
          <p className="text-[11px] text-[#8a8b90]">Leads</p>
        </div>
      </div>
    </div>
  );
}
