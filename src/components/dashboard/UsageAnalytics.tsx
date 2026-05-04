import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Image as ImgIcon, AudioLines, Video } from "lucide-react";

const lineData = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  calls: 1200 + Math.round(Math.sin(i / 2) * 400 + i * 80 + Math.random() * 200),
  fakes: 300 + Math.round(Math.cos(i / 2) * 120 + i * 30 + Math.random() * 80),
}));

const mediaData = [
  { type: "Image", value: 4820 },
  { type: "Audio", value: 2140 },
  { type: "Video", value: 3360 },
];

const heatmapHours = Array.from({ length: 24 }, (_, i) => i);
const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(var(--foreground))",
};

export function UsageAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-xl bg-card border border-border p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Inference calls over time</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 14 days · all media types</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Calls</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-danger" /> Fake hits</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--danger))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="calls" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="fakes" stroke="hsl(var(--danger))" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold">Media type distribution</h3>
        <p className="text-xs text-muted-foreground mt-0.5 mb-3">Inferences this month</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mediaData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--secondary))" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          {[
            { label: "Image", val: "4.8K", icon: ImgIcon, color: "text-primary" },
            { label: "Audio", val: "2.1K", icon: AudioLines, color: "text-cyan-accent" },
            { label: "Video", val: "3.3K", icon: Video, color: "text-accent" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg bg-secondary/50 p-2.5">
              <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
              <p className="font-semibold mt-1">{m.val}</p>
              <p className="text-muted-foreground text-[10px]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 rounded-xl bg-card border border-border p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Peak usage times</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Inference call density · UTC</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            Low
            <div className="flex gap-0.5">
              {[0.1, 0.25, 0.45, 0.7, 1].map((o) => (
                <div key={o} className="h-3 w-3 rounded-sm" style={{ background: `hsl(var(--primary) / ${o})` }} />
              ))}
            </div>
            High
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid gap-1" style={{ gridTemplateColumns: "40px repeat(24, 1fr)" }}>
              <div />
              {heatmapHours.map((h) => (
                <div key={h} className="text-[9px] text-muted-foreground text-center">
                  {h % 3 === 0 ? `${h}h` : ""}
                </div>
              ))}
              {heatmapDays.map((d, di) => (
                <>
                  <div key={d} className="text-[10px] text-muted-foreground flex items-center">{d}</div>
                  {heatmapHours.map((h) => {
                    const intensity = Math.max(
                      0.05,
                      Math.min(1, 0.2 + Math.sin((h - 9) / 4) * 0.45 + (di < 5 ? 0.25 : -0.1) + Math.random() * 0.2)
                    );
                    return (
                      <div
                        key={`${d}-${h}`}
                        title={`${d} ${h}:00 — ${(intensity * 1000).toFixed(0)} calls`}
                        className="h-6 rounded-sm hover:ring-2 hover:ring-primary/60 transition-all cursor-pointer"
                        style={{ background: `hsl(var(--primary) / ${intensity})` }}
                      />
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
