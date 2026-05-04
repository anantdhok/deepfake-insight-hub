import { Search, Bell, ChevronDown, Command } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl flex items-center gap-4 px-6">
      <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors text-sm">
        <span className="h-5 w-5 rounded gradient-primary" />
        <span className="font-medium">Acme Security</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search cases, users, media files…"
          className="w-full h-10 pl-10 pr-16 rounded-lg bg-secondary/60 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
          <Command className="h-3 w-3" /> K
        </kbd>
      </div>

      <button className="relative h-9 w-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger ring-2 ring-background animate-pulse-glow" />
      </button>

      <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg hover:bg-secondary transition-colors">
        <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
          JM
        </div>
        <div className="hidden md:flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold">Jordan Maris</span>
          <span className="text-[10px] text-muted-foreground">Admin</span>
        </div>
        <ChevronDown className="hidden md:block h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </header>
  );
}
