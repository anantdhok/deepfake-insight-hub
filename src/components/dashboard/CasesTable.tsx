import { Image as ImgIcon, AudioLines, Video, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const cases = [
  { id: "CSE-8421", user: "Maya Chen", media: "video", status: "Completed", result: "Fake", time: "2m ago", conf: 96 },
  { id: "CSE-8420", user: "Liam Patel", media: "image", status: "Processing", result: "—", time: "4m ago", conf: 0 },
  { id: "CSE-8419", user: "Sofia Rossi", media: "audio", status: "Completed", result: "Real", time: "11m ago", conf: 88 },
  { id: "CSE-8418", user: "Noah Kim", media: "video", status: "Failed", result: "—", time: "23m ago", conf: 0 },
  { id: "CSE-8417", user: "Aiko Tanaka", media: "image", status: "Completed", result: "Fake", time: "32m ago", conf: 92 },
  { id: "CSE-8416", user: "Diego López", media: "audio", status: "Completed", result: "Real", time: "47m ago", conf: 79 },
  { id: "CSE-8415", user: "Priya Nair", media: "video", status: "Pending", result: "—", time: "1h ago", conf: 0 },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-success/15 text-success",
  Processing: "bg-cyan-accent/15 text-cyan-accent",
  Pending: "bg-muted text-muted-foreground",
  Failed: "bg-danger/15 text-danger",
};

const mediaIcon: Record<string, any> = { image: ImgIcon, audio: AudioLines, video: Video };

export function CasesTable() {
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="p-5 flex flex-wrap items-center justify-between gap-3 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold">Recent cases</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Live feed of detection cases across your organization</p>
        </div>
        <div className="flex items-center gap-2">
          {["All", "Image", "Audio", "Video"].map((f, i) => (
            <button
              key={f}
              className={cn(
                "text-xs px-3 py-1.5 rounded-md font-medium transition-colors",
                i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
              )}
            >
              {f}
            </button>
          ))}
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/70 transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
              {["Case ID", "User", "Media", "Status", "Result", "Confidence", "Timestamp", ""].map((h) => (
                <th key={h} className="text-left font-medium px-5 py-3">
                  <span className="inline-flex items-center gap-1 cursor-pointer hover:text-foreground">
                    {h} {h && h !== "" && <ArrowUpDown className="h-3 w-3 opacity-40" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => {
              const Icon = mediaIcon[c.media];
              return (
                <tr key={c.id} className="border-b border-border/60 hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-primary font-semibold">{c.id}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-semibold">
                        {c.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-xs">{c.user}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs capitalize">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" /> {c.media}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("text-[10px] px-2 py-1 rounded-md font-semibold inline-flex items-center gap-1.5", statusStyles[c.status])}>
                      {c.status === "Processing" && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {c.result === "Fake" && <span className="text-xs font-semibold text-danger">⚠ Fake</span>}
                    {c.result === "Real" && <span className="text-xs font-semibold text-success">✓ Real</span>}
                    {c.result === "—" && <span className="text-xs text-muted-foreground">—</span>}
                  </td>
                  <td className="px-5 py-3">
                    {c.conf > 0 ? (
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${c.conf}%`,
                              background: c.result === "Fake" ? "hsl(var(--danger))" : "hsl(var(--success))",
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{c.conf}%</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{c.time}</td>
                  <td className="px-5 py-3">
                    <button className="h-7 w-7 rounded-md hover:bg-secondary flex items-center justify-center">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
