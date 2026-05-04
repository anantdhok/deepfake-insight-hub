import { LayoutDashboard, FolderSearch, Users, CreditCard, FileBarChart, Settings, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Cases", icon: FolderSearch, badge: "24" },
  { title: "Users", icon: Users },
  { title: "Billing / Usage", icon: CreditCard },
  { title: "Reports", icon: FileBarChart },
  { title: "Settings", icon: Settings },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-sidebar-foreground">Verity</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Deepfake Platform</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Workspace</p>
        {items.map((item) => {
          const isActive = active === item.title;
          return (
            <button
              key={item.title}
              onClick={() => setActive(item.title)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/15 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
              {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />}
            </button>
          );
        })}
      </nav>
      <div className="m-3 p-4 rounded-xl gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 ring-grid opacity-20" />
        <p className="text-xs font-semibold relative">Pro plan</p>
        <p className="text-[11px] opacity-80 relative mt-1">68% of monthly credits used</p>
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
          <div className="h-full bg-white rounded-full" style={{ width: "68%" }} />
        </div>
        <button className="mt-3 text-xs font-medium bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 rounded-md relative">
          Upgrade plan
        </button>
      </div>
    </aside>
  );
}
