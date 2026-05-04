import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts";

const pieData = [
  { name: "Real", value: 62.8, color: "hsl(var(--success))" },
  { name: "Fake", value: 37.2, color: "hsl(var(--danger))" },
];

const trendData = Array.from({ length: 12 }).map((_, i) => ({
  m: `W${i + 1}`,
  fakes: 200 + Math.round(Math.sin(i / 2) * 80 + i * 18 + Math.random() * 40),
}));

const confData = [
  { bin: "0-20", v: 120 }, { bin: "20-40", v: 280 }, { bin: "40-60", v: 540 },
  { bin: "60-80", v: 980 }, { bin: "80-95", v: 1540 }, { bin: "95-100", v: 2120 },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(var(--foreground))",
};

export function DetectionInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold">Fake vs Real</h3>
        <p className="text-xs text-muted-foreground mt-0.5">All time</p>
        <div className="h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={55} outerRadius={75} paddingAngle={3} stroke="none">
                {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold">37.2%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fake rate</p>
          </div>
        </div>
        <div className="flex justify-around text-xs mt-2">
          {pieData.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
              <span className="font-semibold">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold">Fake detections trend</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Last 12 weeks</p>
        <div className="h-48 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="fakes" stroke="hsl(var(--danger))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--danger))" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold">Confidence distribution</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Across all detections</p>
        <div className="h-48 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={confData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="bin" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--secondary))" }} />
              <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="url(#confGrad)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
