import { FolderSearch, Cpu, ShieldAlert, Coins, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Total Cases Created", value: "12,847", trend: 12.4, up: true, icon: FolderSearch, tint: "text-primary", bg: "bg-primary/10" },
  { label: "Total Inference Calls", value: "284.3K", trend: 8.1, up: true, icon: Cpu, tint: "text-cyan-accent", bg: "bg-cyan-accent/10" },
  { label: "Fake Detection Rate", value: "37.2%", trend: 2.8, up: true, icon: ShieldAlert, tint: "text-danger", bg: "bg-danger/10" },
  { label: "Credits Remaining", value: "48,210", trend: 14.6, up: false, icon: Coins, tint: "text-warning", bg: "bg-warning/10" },
  { label: "Total Cost Incurred", value: "$8,492", trend: 4.2, up: true, icon: DollarSign, tint: "text-accent", bg: "bg-accent/10" },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpis.map((k, i) => (
        <div
          key={k.label}
          className="group relative rounded-xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-glow transition-all cursor-pointer overflow-hidden animate-fade-in"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="absolute inset-0 gradient-radial opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-start justify-between">
            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", k.bg)}>
              <k.icon className={cn("h-5 w-5", k.tint)} />
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md",
                k.up ? "text-success bg-success/10" : "text-danger bg-danger/10"
              )}
            >
              {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {k.trend}%
            </div>
          </div>
          <div className="relative mt-4">
            <p className="text-xs text-muted-foreground font-medium">{k.label}</p>
            <p className="text-2xl font-bold tracking-tight mt-1">{k.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
