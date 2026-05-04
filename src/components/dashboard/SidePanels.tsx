import { ListOrdered } from "lucide-react";

const topUsers = [
  { name: "Maya Chen", cases: 482, color: "from-primary to-accent" },
  { name: "Liam Patel", cases: 391, color: "from-cyan-accent to-primary" },
  { name: "Sofia Rossi", cases: 318, color: "from-accent to-danger" },
  { name: "Noah Kim", cases: 274, color: "from-success to-cyan-accent" },
  { name: "Aiko Tanaka", cases: 219, color: "from-warning to-accent" },
];

export function SidePanels() {
  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">User insights</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Active vs inactive · last 30 days</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="rounded-lg p-3 bg-primary/10 border border-primary/20">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Total</p>
          <p className="text-xl font-bold mt-1">1,284</p>
          <p className="text-[10px] text-muted-foreground">+9.2% MoM</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3 flex items-center gap-1">
          <ListOrdered className="h-3 w-3" /> Top users by activity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
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
  );
}
