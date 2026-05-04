import { TrendingUp, Activity, CheckCircle2, ListOrdered, AlertTriangle, ZapOff, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

const topUsers = [
  { name: "Maya Chen", cases: 482, color: "from-primary to-accent" },
  { name: "Liam Patel", cases: 391, color: "from-cyan-accent to-primary" },
  { name: "Sofia Rossi", cases: 318, color: "from-accent to-danger" },
  { name: "Noah Kim", cases: 274, color: "from-success to-cyan-accent" },
  { name: "Aiko Tanaka", cases: 219, color: "from-warning to-accent" },
];

const alerts = [
  { icon: TrendingUp, title: "Usage spike detected", desc: "Inference calls 3.2× above weekly avg", tone: "warning" },
  { icon: Coins, title: "Low credits warning", desc: "48,210 credits left · ~5 days runway", tone: "danger" },
  { icon: ZapOff, title: "12 failed jobs", desc: "Video pipeline · last hour", tone: "danger" },
];

const toneStyles: Record<string, string> = {
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

export function SidePanels() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">User insights</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Active vs inactive · last 30 days</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg p-3 bg-success/10 border border-success/20">
            <p className="text-[10px] uppercase tracking-wider text-success font-semibold">Active</p>
            <p className="text-xl font-bold mt-1">428</p>
            <p className="text-[10px] text-muted-foreground">+18 this week</p>
          </div>
          <div className="rounded-lg p-3 bg-secondary/60">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Inactive</p>
            <p className="text-xl font-bold mt-1">96</p>
            <p className="text-[10px] text-muted-foreground">−4 this week</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1">
            <ListOrdered className="h-3 w-3" /> Top users by activity
          </p>
          <div className="space-y-2">
            {topUsers.map((u, i) => (
              <div key={u.name} className="flex items-center gap-3 group">
                <span className="text-[10px] text-muted-foreground w-3">{i + 1}</span>
                <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-[10px] font-semibold text-white`}>
                  {u.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{u.name}</p>
                  <div className="h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${(u.cases / 482) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold tabular-nums">{u.cases}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">System health</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Live infrastructure metrics</p>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-success bg-success/10 px-2 py-1 rounded-md">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" /> OPERATIONAL
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-muted-foreground"><Activity className="h-3 w-3" /> API latency</span>
              <span className="font-semibold">142 ms</span>
            </div>
            <div className="flex items-end gap-0.5 h-8">
              {Array.from({ length: 32 }).map((_, i) => {
                const h = 30 + Math.sin(i / 2) * 20 + Math.random() * 30;
                return <div key={i} className="flex-1 rounded-sm bg-primary/60 hover:bg-primary transition-colors" style={{ height: `${h}%` }} />;
              })}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-muted-foreground"><CheckCircle2 className="h-3 w-3" /> Inference success rate</span>
              <span className="font-semibold text-success">99.4%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: "99.4%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-muted-foreground"><ListOrdered className="h-3 w-3" /> Queue status</span>
              <span className="font-semibold">28 jobs</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="rounded-md bg-secondary/60 p-2">
                <p className="text-muted-foreground">Pending</p>
                <p className="font-bold text-sm mt-0.5">14</p>
              </div>
              <div className="rounded-md bg-cyan-accent/10 p-2">
                <p className="text-cyan-accent font-semibold">Processing</p>
                <p className="font-bold text-sm mt-0.5">12</p>
              </div>
              <div className="rounded-md bg-danger/10 p-2">
                <p className="text-danger font-semibold">Failed</p>
                <p className="font-bold text-sm mt-0.5">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              Alerts
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-danger/15 text-danger font-semibold">3</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Requires attention</p>
          </div>
          <button className="text-xs text-primary hover:underline font-medium">View all</button>
        </div>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div
              key={a.title}
              className={cn(
                "flex gap-3 p-3 rounded-lg border cursor-pointer hover:scale-[1.01] transition-transform",
                toneStyles[a.tone]
              )}
            >
              <div className={cn("h-8 w-8 rounded-md flex items-center justify-center shrink-0", a.tone === "warning" ? "bg-warning/20" : "bg-danger/20")}>
                <a.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground">{a.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.desc}</p>
              </div>
              <AlertTriangle className="h-3.5 w-3.5 opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
