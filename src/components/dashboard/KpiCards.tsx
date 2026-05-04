import { Users, FolderSearch, Cpu, Layers, ArrowUpRight, ArrowDownRight, Image as ImgIcon, AudioLines, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Total Users */}
      <Card
        icon={Users}
        tint="text-primary"
        bg="bg-primary/10"
        label="Total Users"
        value="1,284"
        trend={9.2}
        up
        delay={0}
      >
        <div className="flex items-center gap-3 mt-3">
          <div className="flex -space-x-2">
            {["MC", "LP", "SR", "NK"].map((i, idx) => (
              <div
                key={i}
                className={cn(
                  "h-6 w-6 rounded-full border-2 border-card flex items-center justify-center text-[9px] font-semibold text-white",
                  ["bg-primary", "bg-accent", "bg-cyan-accent", "bg-success"][idx]
                )}
              >
                {i}
              </div>
            ))}
            <div className="h-6 w-6 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-[9px] font-semibold">
              +
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">428 active now</span>
        </div>
      </Card>

      {/* Total Cases (with files) */}
      <Card
        icon={FolderSearch}
        tint="text-cyan-accent"
        bg="bg-cyan-accent/10"
        label="Total Cases"
        value="12,847"
        trend={12.4}
        up
        delay={60}
      >
        <div className="flex items-center justify-between mt-3 text-[10px]">
          <span className="text-muted-foreground">Files attached</span>
          <span className="font-semibold tabular-nums">38,219</span>
        </div>
        <div className="mt-1.5 h-1 bg-secondary rounded-full overflow-hidden flex">
          <div className="h-full bg-primary" style={{ width: "62%" }} />
          <div className="h-full bg-cyan-accent" style={{ width: "24%" }} />
          <div className="h-full bg-accent" style={{ width: "14%" }} />
        </div>
      </Card>

      {/* Total Inference Calls */}
      <Card
        icon={Cpu}
        tint="text-accent"
        bg="bg-accent/10"
        label="Total Inference Calls"
        value="284.3K"
        trend={8.1}
        up
        delay={120}
      >
        <div className="grid grid-cols-3 gap-1.5 mt-3 text-[10px]">
          <Stat label="Fake" value="106K" dot="bg-danger" valClass="text-danger" />
          <Stat label="Safe" value="172K" dot="bg-success" valClass="text-success" />
          <Stat label="Pending" value="6.3K" dot="bg-warning" valClass="text-warning" />
        </div>
      </Card>

      {/* Media Types Distribution */}
      <Card
        icon={Layers}
        tint="text-warning"
        bg="bg-warning/10"
        label="Media Types"
        value="10.3K"
        trend={3.6}
        up
        delay={180}
      >
        <div className="grid grid-cols-3 gap-1.5 mt-3 text-[10px]">
          <MediaStat icon={ImgIcon} label="Image" value="4.8K" color="text-primary" />
          <MediaStat icon={AudioLines} label="Audio" value="2.1K" color="text-cyan-accent" />
          <MediaStat icon={Video} label="Video" value="3.4K" color="text-accent" />
        </div>
      </Card>
    </div>
  );
}

function Card({
  icon: Icon,
  tint,
  bg,
  label,
  value,
  trend,
  up,
  delay,
  children,
}: {
  icon: any;
  tint: string;
  bg: string;
  label: string;
  value: string;
  trend: number;
  up: boolean;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="group relative rounded-xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-glow transition-all cursor-pointer overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 gradient-radial opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", bg)}>
          <Icon className={cn("h-5 w-5", tint)} />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md",
            up ? "text-success bg-success/10" : "text-danger bg-danger/10"
          )}
        >
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}%
        </div>
      </div>
      <div className="relative mt-4">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold tracking-tight mt-1">{value}</p>
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

function Stat({ label, value, dot, valClass }: { label: string; value: string; dot: string; valClass: string }) {
  return (
    <div className="rounded-md bg-secondary/50 p-2">
      <span className="flex items-center gap-1 text-muted-foreground">
        <span className={cn("h-1.5 w-1.5 rounded-full", dot)} /> {label}
      </span>
      <p className={cn("font-bold text-xs mt-0.5 tabular-nums", valClass)}>{value}</p>
    </div>
  );
}

function MediaStat({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="rounded-md bg-secondary/50 p-2">
      <Icon className={cn("h-3 w-3", color)} />
      <p className="font-bold text-xs mt-0.5 tabular-nums">{value}</p>
      <p className="text-muted-foreground text-[9px]">{label}</p>
    </div>
  );
}
