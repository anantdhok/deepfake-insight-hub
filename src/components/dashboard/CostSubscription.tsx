import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sparkles, Image as ImgIcon, AudioLines, Video } from "lucide-react";

const costData = Array.from({ length: 7 }).map((_, i) => ({
  d: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  cost: 280 + Math.round(Math.sin(i) * 80 + i * 30 + Math.random() * 60),
}));

const breakdown = [
  { label: "Image", val: 3120, pct: 42, color: "hsl(var(--primary))", icon: ImgIcon },
  { label: "Video", val: 3680, pct: 38, color: "hsl(var(--accent))", icon: Video },
  { label: "Audio", val: 1692, pct: 20, color: "hsl(var(--cyan-accent))", icon: AudioLines },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(var(--foreground))",
};

export function CostSubscription() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Credits usage</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-warning/15 text-warning font-semibold">68% USED</span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">101,790</span>
            <span className="text-xs text-muted-foreground">/ 150,000</span>
          </div>
          <div className="mt-3 h-2.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full gradient-primary rounded-full transition-all" style={{ width: "68%" }} />
          </div>
        </div>
        <div className="mt-5 p-3 rounded-lg bg-warning/10 border border-warning/20 flex gap-2">
          <Sparkles className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-warning">Forecast</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">At current burn rate, credits will last <span className="font-semibold text-foreground">5 days</span>.</p>
          </div>
        </div>
        <button className="w-full mt-3 text-xs font-medium gradient-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity">
          Top up credits
        </button>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold">Daily cost trend</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
        <div className="h-40 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v}`, "Cost"]} />
              <Area type="monotone" dataKey="cost" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#costGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-baseline justify-between mt-2 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Week total</span>
          <span className="text-lg font-bold">$2,184</span>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold">Cost by media type</h3>
        <p className="text-xs text-muted-foreground mt-0.5">This month</p>
        <div className="space-y-4 mt-4">
          {breakdown.map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-2 font-medium">
                  <b.icon className="h-3.5 w-3.5" style={{ color: b.color }} />
                  {b.label}
                </span>
                <span className="font-semibold">${b.val.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
