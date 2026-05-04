import { useMemo, useState } from "react";
import { Image as ImgIcon, AudioLines, Video, FileText, Users, Sparkles, Clock, History, HardDrive, Feather, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Media = "image" | "audio" | "video";

interface FileRow {
  id: string;
  name: string;
  type: Media;
  uploads: number; // how many users uploaded this file (popularity)
  uploaders: number;
  size: number; // bytes
  uploadedAt: number; // ms epoch
  result: "Fake" | "Real" | "Pending";
  conf: number;
}

const now = Date.now();
const m = 60_000;
const h = 60 * m;
const d = 24 * h;

const FILES: FileRow[] = [
  { id: "F-9821", name: "ceo_announcement.mp4", type: "video", uploads: 184, uploaders: 142, size: 248_000_000, uploadedAt: now - 2 * h, result: "Fake", conf: 96 },
  { id: "F-9820", name: "press_call_audio.wav", type: "audio", uploads: 121, uploaders: 98, size: 42_000_000, uploadedAt: now - 5 * h, result: "Real", conf: 88 },
  { id: "F-9819", name: "leaked_photo_v3.jpg", type: "image", uploads: 312, uploaders: 271, size: 3_400_000, uploadedAt: now - 8 * h, result: "Fake", conf: 92 },
  { id: "F-9818", name: "interview_clip.mov", type: "video", uploads: 1, uploaders: 1, size: 1_240_000_000, uploadedAt: now - 12 * h, result: "Real", conf: 79 },
  { id: "F-9817", name: "voice_memo_032.m4a", type: "audio", uploads: 2, uploaders: 2, size: 820_000, uploadedAt: now - 18 * h, result: "Pending", conf: 0 },
  { id: "F-9816", name: "campaign_banner.png", type: "image", uploads: 87, uploaders: 64, size: 1_800_000, uploadedAt: now - 26 * h, result: "Real", conf: 84 },
  { id: "F-9815", name: "summit_keynote_4k.mp4", type: "video", uploads: 14, uploaders: 12, size: 2_100_000_000, uploadedAt: now - 2 * d, result: "Fake", conf: 91 },
  { id: "F-9814", name: "thumb_small.webp", type: "image", uploads: 4, uploaders: 3, size: 28_000, uploadedAt: now - 3 * d, result: "Real", conf: 72 },
  { id: "F-9813", name: "raw_archive_2019.wav", type: "audio", uploads: 1, uploaders: 1, size: 312_000_000, uploadedAt: now - 412 * d, result: "Real", conf: 68 },
  { id: "F-9812", name: "training_set_001.jpg", type: "image", uploads: 240, uploaders: 198, size: 980_000, uploadedAt: now - 5 * d, result: "Fake", conf: 95 },
  { id: "F-9811", name: "seed_clip.mp3", type: "audio", uploads: 3, uploaders: 3, size: 120_000, uploadedAt: now - 30 * d, result: "Pending", conf: 0 },
  { id: "F-9810", name: "founder_origin_2017.mov", type: "video", uploads: 22, uploaders: 18, size: 640_000_000, uploadedAt: now - 600 * d, result: "Real", conf: 81 },
];

type TemplateKey = "popular" | "unique" | "latest" | "oldest" | "large" | "small";

const TEMPLATES: { key: TemplateKey; label: string; icon: any; desc: string }[] = [
  { key: "popular", label: "Most popular", icon: Sparkles, desc: "Files uploaded by many users" },
  { key: "unique", label: "Most unique", icon: Feather, desc: "Files only uploaded by 1–2 users" },
  { key: "latest", label: "Recently uploaded", icon: Clock, desc: "Newest first" },
  { key: "oldest", label: "Oldest uploaded", icon: History, desc: "Earliest in the system" },
  { key: "large", label: "Largest files", icon: HardDrive, desc: "Highest storage footprint" },
  { key: "small", label: "Smallest files", icon: Download, desc: "Tiny payloads" },
];

const mediaIcon = { image: ImgIcon, audio: AudioLines, video: Video } as const;

const resultStyles: Record<string, string> = {
  Fake: "bg-danger/15 text-danger",
  Real: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
};

function formatSize(b: number) {
  if (b >= 1e9) return `${(b / 1e9).toFixed(2)} GB`;
  if (b >= 1e6) return `${(b / 1e6).toFixed(1)} MB`;
  if (b >= 1e3) return `${(b / 1e3).toFixed(0)} KB`;
  return `${b} B`;
}

function formatAge(t: number) {
  const diff = now - t;
  if (diff < h) return `${Math.round(diff / m)}m ago`;
  if (diff < d) return `${Math.round(diff / h)}h ago`;
  if (diff < 30 * d) return `${Math.round(diff / d)}d ago`;
  if (diff < 365 * d) return `${Math.round(diff / (30 * d))}mo ago`;
  return `${Math.round(diff / (365 * d))}y ago`;
}

export function FilesTable() {
  const [tpl, setTpl] = useState<TemplateKey>("popular");

  const rows = useMemo(() => {
    const arr = [...FILES];
    switch (tpl) {
      case "popular": return arr.sort((a, b) => b.uploads - a.uploads);
      case "unique": return arr.sort((a, b) => a.uploaders - b.uploaders);
      case "latest": return arr.sort((a, b) => b.uploadedAt - a.uploadedAt);
      case "oldest": return arr.sort((a, b) => a.uploadedAt - b.uploadedAt);
      case "large": return arr.sort((a, b) => b.size - a.size);
      case "small": return arr.sort((a, b) => a.size - b.size);
    }
  }, [tpl]);

  const active = TEMPLATES.find((t) => t.key === tpl)!;

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Files library</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{active.desc}</p>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground">
            Showing <span className="text-foreground font-semibold">{rows.length}</span> files
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {TEMPLATES.map((t) => {
            const active = t.key === tpl;
            return (
              <button
                key={t.key}
                onClick={() => setTpl(t.key)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all border",
                  active
                    ? "bg-primary/10 text-primary border-primary/30 shadow-glow"
                    : "bg-secondary/40 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                )}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
              {["File", "Type", "Uploads", "Unique users", "Size", "Result", "Uploaded", ""].map((h) => (
                <th key={h} className="text-left font-medium px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const Icon = mediaIcon[r.type];
              return (
                <tr key={r.id} className="border-b border-border/60 hover:bg-secondary/40 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{r.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{r.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs capitalize text-muted-foreground">
                      <Icon className="h-3 w-3" /> {r.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tabular-nums">{r.uploads}</span>
                      <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-primary rounded-full"
                          style={{ width: `${Math.min(100, (r.uploads / 312) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" /> {r.uploaders}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs tabular-nums text-muted-foreground">{formatSize(r.size)}</td>
                  <td className="px-5 py-3">
                    <span className={cn("text-[10px] px-2 py-1 rounded-md font-semibold", resultStyles[r.result])}>
                      {r.result}
                      {r.conf > 0 && <span className="ml-1 opacity-70">{r.conf}%</span>}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{formatAge(r.uploadedAt)}</td>
                  <td className="px-5 py-3">
                    <button className="h-7 w-7 rounded-md hover:bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
