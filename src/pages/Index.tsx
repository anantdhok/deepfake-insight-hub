import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { UsageAnalytics } from "@/components/dashboard/UsageAnalytics";
import { DetectionInsights } from "@/components/dashboard/DetectionInsights";
import { CostSubscription } from "@/components/dashboard/CostSubscription";
import { CasesTable } from "@/components/dashboard/CasesTable";
import { FilesTable } from "@/components/dashboard/FilesTable";
import { SidePanels } from "@/components/dashboard/SidePanels";
import { Calendar, Download, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 space-y-6 max-w-[1600px] w-full mx-auto animate-fade-in">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Overview · Acme Security
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">
                Detection <span className="text-gradient">intelligence</span> at a glance
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Monitor cases, costs, and model performance across your organization.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors">
                <Calendar className="h-3.5 w-3.5" /> Last 30 days
              </button>
              <button className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors">
                <Download className="h-3.5 w-3.5" /> Export
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow">
                <Sparkles className="h-3.5 w-3.5" /> New case
              </button>
            </div>
          </header>

          <KpiCards />
          <UsageAnalytics />
          <DetectionInsights />
          <CostSubscription />
          <CasesTable />
          <FilesTable />
          <SidePanels />

          <footer className="pt-6 pb-4 text-center text-[11px] text-muted-foreground">
            Verity Deepfake Platform · Last updated {new Date().toLocaleTimeString()}
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
